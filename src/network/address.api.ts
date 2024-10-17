import { apolloClient } from "@/clients/apollo.client";
import { getAndParseStorageItem } from "@/lib/json.lib";
import { Address, City, ShippingAddressFormData, ShippingAddressLocalStorage } from "@/types/address.types";
import { gql } from "@apollo/client";
import { useCallback, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

const CITIES_QUERY = gql`
  query Cities {
    cities {
      id
      name
    }
  }
`;
const ADDRESSES_QUERY = gql`
  query Addresses {
    addresses {
      id
      state
      street1
      street2
      zipCode
      default
      city {
        name
      }
      country {
        name
      }
    }
  }
`;

const CREATE_ADDRESS_MUTATION = gql`
  mutation CreateAddress($input: CreateAddressInput!) {
    createAddress(input: $input)
  }
`;

export const getCities = async (): Promise<Array<City>> => {
  try {
    const { data } = await apolloClient.query({
      query: CITIES_QUERY,
    });

    if (data && data.cities) {
      return data.cities;
    }
  } catch (e) {
    console.log(e);
  }

  return [];
};

export const getAddressesBrwoser = async (): Promise<Array<Address>> => {
  const addresses =
    getAndParseStorageItem<ShippingAddressLocalStorage[]>("addresses") || [];
  return addresses.map((address) => ({
    ...address,
    city: { id: address.city.id, name: address.city.name },
    country: { id: address.country.id, name: address.country.name },
  }));
};

export const getAddressesApi = async (): Promise<Array<Address>> => {
  try {
    const { data } = await apolloClient.query({
      query: ADDRESSES_QUERY,
    });

    if (data && data.addresses) {
      return data.addresses;
    }
  } catch (e) {
    console.log(e);
  }

  return [];
};

export const useCities = () => {
  const [cities, setCities] = useState<Array<City>>([]);

  useEffect(() => {
    getCities().then(setCities).catch(console.error);
  }, []);

  return {
    cities,
  };
};

export const useAddresses = () => {
  const [addresses, setAddresses] = useState<Array<Address>>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  const setters = useCallback(
    (addresses: Array<Address>) => {
      setAddresses(addresses);
      setSelectedAddress(addresses.find((address) => address.default) || null);
    },
    [addresses]
  );

  const reload = () => {
    getAddressAction().then(setters).catch(console.error);
  };

  useEffect(() => {
    reload();
  }, []);

  return {
    addresses,
    reload,
    selectedAddress,
    setSelectedAddress,
  };
};

export const createAddressBrowser = async (values: ShippingAddressFormData) => {
  let addresses =
    getAndParseStorageItem<Array<ShippingAddressLocalStorage>>("addresses") || [];
  addresses = addresses.map((address) => ({ ...address, default: false }));
  addresses.push({ ...values, id: uuid(), default: true });
  localStorage.setItem("addresses", JSON.stringify(addresses));
};

export const createAddressApi = async (values: ShippingAddressFormData) => {
  const { data } = await apolloClient.mutate({
    mutation: CREATE_ADDRESS_MUTATION,
    variables: {
      input: {
        ...values,
        city: `${values.city.id}`,
        country: `${values.country.id}`,
      },
    },
  });

  if (data && data.createAddress) {
    return true;
  }

  throw new Error("Something went wrong");
};

export const createAddressAction = async (
  values: Partial<ShippingAddressFormData>
) => {
  // Fixme: we can't rely on the userData as localStorage can be edited
  if (getAndParseStorageItem("userData")) {
    return createAddressApi(values as ShippingAddressFormData);
  }
  return createAddressBrowser(values as ShippingAddressFormData);
};

export const getAddressAction = async () => {
  if (getAndParseStorageItem("userData")) {
    return getAddressesApi();
  }
  return getAddressesBrwoser();
};

