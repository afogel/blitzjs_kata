import {
  Avatar,
  Button,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react"
import Image from "next/image"
import logo from "public/logo.svg"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import logout from "src/auth/mutations/logout"
import { useMutation } from "@blitzjs/rpc"
import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { Suspense } from "react"
import { Spinner } from "flowbite-react"

const LoginButton = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }
        >
          <DropdownHeader>
            <span className="block text-sm">{currentUser.name}</span>
            <span className="block truncate text-sm font-medium">{currentUser.email}</span>
          </DropdownHeader>
          <DropdownItem>Dashboard</DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          <DropdownItem>Earnings</DropdownItem>
          <DropdownDivider />
          <DropdownItem
            onClick={async () => {
              await logoutMutation()
            }}
          >
            Sign out
          </DropdownItem>
        </Dropdown>
        <NavbarToggle />
      </>
    )
  } else {
    return (
      <>
        <Link href={Routes.SignupPage()}>
          <Button>
            <strong>Sign Up</strong>
          </Button>
        </Link>
        <Link href={Routes.LoginPage()}>
          <Button>
            <strong>Login</strong>
          </Button>
        </Link>
      </>
    )
  }
}

export default function Nav() {
  return (
    <Navbar fluid rounded className="bg-primary-400">
      <NavbarBrand href="/">
        <Image priority src={logo} alt="Pillar Security" width={150} height={50} />
      </NavbarBrand>
      <div className="flex md:order-2 space-x-2">
        <Suspense fallback={<Spinner size="md" />}>
          <LoginButton />
        </Suspense>
      </div>
      <NavbarCollapse>
        <NavbarLink href="#" active>
          Home
        </NavbarLink>
        <NavbarLink href={Routes.PromptsPage().href}>Prompts</NavbarLink>
        <NavbarLink href="#">Services</NavbarLink>
        <NavbarLink href="#">Pricing</NavbarLink>
        <NavbarLink href="#">Contact</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  )
}
