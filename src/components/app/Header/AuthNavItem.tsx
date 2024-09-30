import Link from "next/link"

function classNames(...classes: Array<string>) {
    return classes.filter(Boolean).join(' ')
}

export const AuthNavItem = ({ currentPath }: { currentPath: string }) => {
    let redirectTo = currentPath === '/auth/login' ? { to: '/auth/register', text: 'Register' } : { to: '/auth/login', text: 'Login' }

    return <Link
        href={redirectTo.to}
        className={classNames(
            'text-gray-300 rounded-md px-3 py-2 text-sm font-medium',
        )}
    >
        {redirectTo.text}
    </Link>
}