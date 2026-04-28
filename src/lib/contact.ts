const normalizedWhatsApp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "");
const normalizedInstagram = process.env.NEXT_PUBLIC_INSTAGRAM_URL?.trim();
const defaultEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "contato@leialt.com.br";

const hasHttpProtocol = (value: string) => /^https?:\/\//i.test(value);

export const contactLinks = {
  whatsapp: normalizedWhatsApp
    ? `https://wa.me/${normalizedWhatsApp}`
    : `mailto:${defaultEmail}?subject=Contato%20LeIALT`,
  instagram: normalizedInstagram && hasHttpProtocol(normalizedInstagram) ? normalizedInstagram : null,
  email: defaultEmail,
};
