import { ColorPicker } from '@/components/ui/ColorPicker'
import { Radio } from '@/components/ui/Radio'
import { Variation, VariationType } from '@/types/product.types'

type ProductVariationType = VariationType & {
  selectedVariation: Variation
}

export const VariationTypeComponent = ({
  variationType,
  variations,
  onChangeVariation,
}: {
  variationType: ProductVariationType
  variations: Variation[]
  onChangeVariation: (
    variation: Variation,
    variationType: ProductVariationType
  ) => void
}) => {
  const { id, name, component, selectedVariation } = variationType

  const renderComponent = () => {
    switch (component) {
      case 'list':
        return (
          <Radio
            onChange={(value) => onChangeVariation(value, variationType)}
            label={name}
            options={variations}
            optionName={(variation) => variation.name}
            keyExtractor={(variation) => variation.id}
            disabled={(option) => option.quantity <= 0}
            selectedOption={selectedVariation}
          />
        )
      case 'color':
        return (
          <ColorPicker
            getKey={(variation) => variation.id}
            colorName={(variation) => variation.value!}
            selectedColor={selectedVariation}
            onColorChange={(value) => onChangeVariation(value, variationType)}
            colors={variations}
          />
        )
      default:
        return null
    }
  }

  return <div key={id}>{renderComponent()}</div>
}
