export const appUrl = import.meta.env.VITE_API_URL;

export const dropdownValuesForCountryCodes = [
  { value: "+91", label: "India (+91)" },
  { value: "+1", label: "USA (+1)" },
  { value: "+44", label: "UK (+44)" },
  { value: "+61", label: "Australia (+61)" },
  { value: "+81", label: "Japan (+81)" },
  { value: "+49", label: "Germany (+49)" },
  { value: "+33", label: "France (+33)" },
  { value: "+86", label: "China (+86)" },
  { value: "+39", label: "Italy (+39)" },
  { value: "+7", label: "Russia (+7)" },
  { value: "+55", label: "Brazil (+55)" },
  { value: "+34", label: "Spain (+34)" },
  { value: "+82", label: "South Korea (+82)" },
  { value: "+64", label: "New Zealand (+64)" },
  { value: "+27", label: "South Africa (+27)" },
];

export const dropdownValuesForRole = [
  { value: "ADMIN", label: "Admin" },
  { value: "USER", label: "User" },
];

export const navItems = [
  { path: "/get-post", label: "Home" },
  { path: "/profile", label: "Profile" },
];
