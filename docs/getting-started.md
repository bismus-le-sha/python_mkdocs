# Step-by-step manual

### 1. Установка Python и проверка инструментов

```bash
python --version
pip --version
pip3 --version
```

Проверить наличие `virtualenv`:

```bash
virtualenv --version
```

### 2. Установка virtualenv (если нет)

```bash
python -m pip install --user virtualenv
```

### 3. Создание проекта и окружения

```bash
mkdir mydocs
cd mydocs
python -m venv venv
source venv/bin/activate   # Linux/Mac
venv\Scripts\activate      # Windows
```

### 4. Установка mkdocs

```bash
pip install mkdocs
```

### 5. Инициализация документации

```bash
mkdocs new .
mkdocs serve
```

### 6. Push в репозиторий

```bash
git init
git add .
git commit -m "init mkdocs project"
git remote add origin <repo_url>
git push origin main
```

### 7. Настройка GitHub Actions

- Создать файл .github/workflows/deploy.yml

- Добавить job для сборки и деплоя (использовать JamesIves/github-pages-deploy-action, он очень удобный).

### 8. Деплой в GitHub Pages

- В настройках репозитория включить GitHub Pages.

- Указать ветку gh-pages (или /docs).

### 9. Проверка

Перейти по адресу:

```bash
https://<username>.github.io/<repo_name>/
```
