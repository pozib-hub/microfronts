export const routePath = {
    "main": '/',
    "forbidden": "/forbidden",
    "about": '/about',
    "profile": (id?: string) => `/profile${id ? `/${id}` : ""}`,
    "articles": '/articles',
    "articleDetail": (id: string) => `/articles/${id}`,
    "articleEdit": (id: string) => `/ articles / ${id}/edit`,
    "articleCreate": '/articles/create',
    "adminPanel": "admin/panel",

    "CharacteristicsUVHD": '/CharacteristicsUVHD',
    "test": '/test',
}

