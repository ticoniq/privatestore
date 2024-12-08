import {
  ArchiveIcon,
  BellIcon,
  GanttChartSquare,
  HomeIcon,
  PackageOpenIcon,
  Settings,
  SlidersHorizontalIcon,
  TicketIcon,
  UserPlus2Icon,
  Users2Icon,
} from "lucide-react";

export const sidebarData = {
  user: {
    name: "Olaniyi Ogungbe",
    email: "olan@StoretoLet.co",
    avatar: "/avatars/StoretoLet.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: HomeIcon,
    },
    {
      title: "App Customization",
      url: "/app-customization",
      icon: SlidersHorizontalIcon,
    },
    {
      title: "Orders",
      url: "/orders",
      icon: PackageOpenIcon,
    },
    {
      title: "Products",
      url: "",
      icon: ArchiveIcon,
      items: [
        {
          title: "Products",
          url: "/products",
        },
        {
          title: "Product Categories",
          url: "/products/product-categories",
        },
        {
          title: "Product Addons",
          url: "/products/product-addons",
        },
        {
          title: "Addons Categories",
          url: "/products/addons-categories",
        },
      ],
    },
    {
      title: "Customers",
      url: "/customers",
      icon: Users2Icon,
    },
    {
      title: "Team",
      url: "/team",
      icon: UserPlus2Icon,
    },
    {
      title: "Promotions",
      url: "/orders",
      icon: TicketIcon,
    },
    {
      title: "Notifications",
      url: "/notification",
      icon: BellIcon,
    },
    {
      title: "Analytics",
      url: "/orders",
      icon: GanttChartSquare,
    },
    {
      title: "Settings",
      url: "/orders",
      icon: Settings,
    },
  ],
};

export const templates = [
  {
    templateStyle: "Modern Shop",
    businessCategory: "E-commerce",
    templateImage: "/templates/cloth-template.png",
    templateCategories: [
      {
        categoryStyle: "List View",
        categoryImage: "/templates/category-1.png",
      },
      {
        categoryStyle: "Card View",
        categoryImage: "/templates/category-2.png",
      },
    ],
    templateNavbarStyles: [
      {
        navBarStyle: "electronics",
        categoryImage: "/templates/electronics.png",
      },
      {
        navBarStyle: "fashion",
        categoryImage: "/templates/fashion.png",
      },
      {
        navBarStyle: "food",
        categoryImage: "/templates/food.png",
      },
      {
        navBarStyle: "groceries",
        categoryImage: "/templates/groceries.png",
      },
    ],
  },
  {
    templateStyle: "Restaurant",
    businessCategory: "Food & Beverage",
    templateImage: "/templates/food-template.png",
    templateCategories: [
      {
        categoryStyle: "List View",
        categoryImage: "/templates/category-1.png",
      },
    ],
    templateNavbarStyles: [
      {
        navBarStyle: "electronics",
        categoryImage: "/templates/electronics.png",
      },
      {
        navBarStyle: "fashion",
        categoryImage: "/templates/fashion.png",
      },
    ],
  },
];

export const colorPresets = {
  primary: [
    { name: "Blue", value: "#4F46E5" },
    { name: "Orange", value: "#EA580C" },
    { name: "Yellow", value: "#EAB308" },
    { name: "Teal", value: "#0D9488" },
    { name: "Custom", value: "custom" },
  ],
  background: [
    { name: "White", value: "#FFFFFF" },
    { name: "Medium Gray", value: "#E5E7EB" },
    { name: "Light Gray", value: "#F3F4F6" },
    { name: "Dark Gray", value: "#D1D5DB" },
  ],
  headerText: [
    { name: "Black", value: "#000000" },
    { name: "Medium Gray", value: "#4B5563" },
    { name: "Light Gray", value: "#6B7280" },
    { name: "Dark Gray", value: "#374151" },
  ],
  bodyText: [
    { name: "Black", value: "#000000" },
    { name: "Medium Gray", value: "#4B5563" },
    { name: "Light Gray", value: "#6B7280" },
    { name: "Dark Gray", value: "#374151" },
  ],
};

export const typographyIcon = {
  fontOptions: [
    "Inter",
    "Roboto",
    "Open Sans",
    "Poppins",
    "Lato",
    "Montserrat",
  ],

  fontWeights: ["300", "400", "500", "600", "700", "800"],

  iconLibrary: {
    library: ["Feather", "Ionicons", "Font Awesome", "Lucid React"],
    style: ["Style 1", "Style 2", "Style 3", "Style 4"],
  },
};

export const variantList = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];
