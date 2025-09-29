# Custom theme step-by-step manual

### 1. Установка Node-зависимостей

Утсановим `Tailwindcss` третьей версии, чтобы избежать багов новой, четвертой.

```bash
npm init -y
npm install -D tailwindcss@3 postcss postcss-cli autoprefixer cssnano cross-env @tailwindcss/typography
```

### 2. Инициализация Tailwindcss

```bash
npx tailwindcss init
```

### 3. Структура проекта MkDocs

```csharp
project-root/
 ├─ docs/                  # markdown: index.md, about.md ...
 ├─ theme/                 # кастомная тема (шаблоны + css + js)
 │   ├─ main.html          # точка входа в нашу кастомную тему (расширяет base.html), обязательно назвать "main"
 │   ├─ css/
 │   │   └─ tailwind.css   # входной файл
 │   └─ js/
 │       └─ custom.js
 ├─ mkdocs.yml
 ├─ package.json
 ├─ tailwind.config.js     # создается автоматически после инициализации tailwindcss
 └─ postcss.config.js
```

### 4. Настройка Tailwind / PostCSS

theme/css/tailwind.css (входной)

```bash
@tailwind base;
@tailwind components;
@tailwind utilities;
```

tailwind.config.js

```bash
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./docs/**/*.md",
    "./theme/**/*.html",
    "./theme/js/**/*.js"
  ],
  theme: {
    extend: {},
  plugins: [require("@tailwindcss/typography")],
};
```

postcss.config.js

```bash
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? { cssnano: { preset: 'default' } } : {})
  }
};
```

### 5. Скрипты сборки (package.json)

```bash
  "scripts": {
    "dev:css": "postcss theme/css/tailwind.css --output theme/css/index.css",
    "build:css": "cross-env NODE_ENV=production postcss theme/css/tailwind.css -o theme/css/index.css",
    "serve": "python -m mkdocs serve",
    "build:site": "python -m mkdocs build"
  },
```

### 6. Настройка mkdocs.yml

Путь css/index.css — относительный к theme/ (MkDocs копирует theme в итоговую сборку).

```bash
site_name: My Site
site_description: "..."
site_author: "Имя"

theme:
  name: null
  custom_dir: theme

extra_css:
  - css/index.css           # путь относительно дирректории theme
extra_javascript:
  - js/custom.js            # путь относительно дирректории theme

nav:
  - Home: index.md
  - About: about.md

plugins:
  - search
```

### 7. Шаблоны Jinja2 - main.html

```bash
<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="utf-8" />
    <title>
      {% if page.title %}{{ page.title }} – {% endif %}{{ config.site_name }}
    </title>
    <meta name="description" content="{{ config.site_description }}" />
    <meta name="author" content="{{ config.site_author }}" />
    <link
      href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="{{ base_url }}/css/index.css" />
  </head>
  <body class="bg-gray-50 font-atkinson">
    <!-- Header -->
    <header class="bg-klein text-white p-4 shadow-md">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-xl font-bold">{{ config.site_name }}</h1>
        <nav class="flex space-x-6">
          {% for nav_item in nav %}
          <a
            href="{{ nav_item.url | url }}"
            class="px-2 py-1 rounded hover:bg-klein-500 hover:text-white {% if nav_item.active %}bg-blue-600 text-white{% endif %}"
          >
            {{ nav_item.title }}
          </a>
          {% endfor %}
        </nav>
      </div>
    </header>

    <!-- Content -->
    <main class="container mx-auto p-6">
      <article class="prose prose-lg prose-klein max-w-none font-atkinson">
        {{ page.content }}
      </article>
    </main>

    <!-- Footer -->
    <footer class="bg-klein text-gray-200 p-4 mt-10 font-atkinson">
      <div class="container mx-auto text-center">
        <p>© {{ config.site_author }}, {{ build_date }}</p>
      </div>
    </footer>

    <script src="{{ base_url }}/js/custom.js"></script>
  </body>
</html>
```

Используем в шаблоне класс prose-klein (см. ниже):

```bash
<article class="prose prose-lg prose-klein max-w-none font-atkinson text-klein">
  {{ content }}
</article>
```

### 8. Типографика, код и цвет klein

Добавим в tailwind.config.js кастомную тему klein внутри typography а также шрифт Atkinson Hyperlegible

```bash
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./docs/**/*.md",
    "./theme/*.html",
    // "./theme/**/*.html",
    "./theme/js/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        atkinson: ['"Atkinson Hyperlegible"', "monospace"],
      },
      typography: ({ theme }) => ({
        klein: {
          css: {
            "--tw-prose-body": theme("colors.klein"),
            "--tw-prose-headings": theme("colors.klein"),
            "--tw-prose-lead": theme("colors.klein"),
            "--tw-prose-links": theme("colors.klein"),
            "--tw-prose-bold": theme("colors.klein-bold"),
            "--tw-prose-counters": theme("colors.klein"),
            "--tw-prose-bullets": theme("colors.klein"),
            "--tw-prose-hr": theme("colors.klein"),
            "--tw-prose-quotes": theme("colors.klein"),
            "--tw-prose-quote-borders": theme("colors.klein"),
            "--tw-prose-captions": theme("colors.klein"),
            "--tw-prose-code": theme("colors.klein"),
            "--tw-prose-pre-code": theme("colors.gray.100"),
            "--tw-prose-pre-bg": theme("colors.klein"),
            "--tw-prose-th-borders": theme("colors.klein"),
            "--tw-prose-td-borders": theme("colors.klein"),
          },
        },
      }),
      colors: {
        klein: "#002fa7",
        klein_bold: "#002074",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
```

Переменные --tw-prose-pre-bg и --tw-prose-pre-code управляют фоном тега "pre" и текстом внутри блока кода соответственно.

### 9. Примеры дополнительных настроек

Изменить цвет выделения текста: можно через Tailwind класс selection или прямым CSS. Делается это в входном файле стилей tailwind.css:

```bash
::selection {
  background-color: #002074;
  color: #ffffff;
}
```

### 10. Проверка локально

```bash
# собрать css
npm run dev:css

# запустить mkdocs (в активированном virtualenv)
npm run serve   # это выполняет `python -m mkdocs serve`
```

### 11. Деплой в GitHub Pages

Добавим в наш экшн установку Node.js для Tailwind/PostCSS и билд css

```bash
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 20

      - name: Install Node dependencies
        run: npm ci

      - name: Build CSS
        run: npm run build:css
```
