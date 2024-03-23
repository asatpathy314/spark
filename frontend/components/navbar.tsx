import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
	NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { useAuth0 } from "@auth0/auth0-react";
import { link as linkStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";

import { Logo } from "@/components/icons";


export const Navbar = () => {

	return (
		<NextUINavbar maxWidth="xl" position="sticky">
			<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
			<NavbarBrand as="li" className="gap-3 max-w-fit">
					<NextLink className="flex justify-start items-center gap-1" href="/">
						<Logo />
						<p className="font-bold text-inherit">SPARK</p>
					</NextLink>
				</NavbarBrand>
			</NavbarContent>
			<NavbarContent className="basis-1/5 sm:basis-full" justify="end">
				<ul className="hidden lg:flex gap-4 justify-start ml-2">
					{siteConfig.navItems.map((item) => (
						<NavbarItem key={item.href}>
							<NextLink
								className={clsx(
									linkStyles({ color: "foreground" }),
									"data-[active=true]:text-primary data-[active=true]:font-medium"
								)}
								color="foreground"
								href={item.href}
							>
								{item.label}
							</NextLink>
						</NavbarItem>
					))}
				</ul>
				<Button
				href="/login/"
				as={Link}
				color="primary"
				variant="solid"
				>
				Login
				</Button>
			</NavbarContent>
			<NavbarMenu>
			<div className="mx-4 mt-2 flex flex-col gap-2">
				{siteConfig.navMenuItems.map((item, index) => (
					<NavbarMenuItem key={`${item}-${index}`}>
						<Link
							color={
								index === 2
									? "primary"
									: index === siteConfig.navMenuItems.length - 1
									? "danger"
									: "foreground"
							}
							href="#"
							size="lg"
						>
							{item.label}
						</Link>
					</NavbarMenuItem>
				))}
			</div>
			</NavbarMenu>
		</NextUINavbar>
	);
};
