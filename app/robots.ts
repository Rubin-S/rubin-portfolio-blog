import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = "https://www.rubz.fun";

    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/rubin-admin/", "/api/"],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
