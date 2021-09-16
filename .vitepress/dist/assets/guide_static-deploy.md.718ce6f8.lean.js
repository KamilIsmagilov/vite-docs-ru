import{o as n,c as e,a as l,b as s}from"./app.877e1a61.js";const t='{"title":"Деплой статичного сайта","description":"","frontmatter":{},"headers":[{"level":2,"title":"Сборка приложения","slug":"сборка-приnожения"},{"level":3,"title":"Локальное тестирование приложения","slug":"локаnьное-тестирование-приnожения"},{"level":2,"title":"GitHub Pages","slug":"github-pages"},{"level":3,"title":"GitHub Pages и Travis CI","slug":"github-pages-и-travis-ci"},{"level":2,"title":"GitLab Pages и GitLab CI","slug":"gitlab-pages-и-gitlab-ci"},{"level":2,"title":"Netlify","slug":"netlify"},{"level":2,"title":"Google Firebase","slug":"google-firebase"},{"level":2,"title":"Surge","slug":"surge"},{"level":2,"title":"Heroku","slug":"heroku"},{"level":2,"title":"Vercel","slug":"vercel"},{"level":2,"title":"Azure Static Web Apps","slug":"azure-static-web-apps"}],"relativePath":"guide/static-deploy.md","lastUpdated":1631745282359}',a={},o=[l("h1",{id:"депnой-статичного-сайта",tabindex:"-1"},[s("Деплой статичного сайта "),l("a",{class:"header-anchor",href:"#депnой-статичного-сайта","aria-hidden":"true"},"#")],-1),l("p",null,"Данное руководство основано на некоторых общих предположениях:",-1),l("ul",null,[l("li",null,[s("Вы используете дефолтный output location ("),l("code",null,"dist"),s("). Эта локация "),l("a",{href:"https://vitejs.dev/config/#build-outdir",target:"_blank",rel:"noopener noreferrer"},[s("может быть изменена с помощью "),l("code",null,"build.outDir")]),s(", и в этом случае Вы можете экстраполировать (extrapolate) инструкции из этого гайда.")]),l("li",null,"Вы используете npm. Вы можете использовать эквивалентные команды, чтобы запустить скрипты, если Вы используете Yarn или другой пакетный менеджер."),l("li",null,"Vite установлен как локальная dev зависимость (dependency) в вашем проекте, и у вас настроены следующие npm скрипты:")],-1),l("div",{class:"language-json"},[l("pre",null,[l("code",null,[l("span",{class:"token punctuation"},"{"),s("\n  "),l("span",{class:"token property"},'"scripts"'),l("span",{class:"token operator"},":"),s(),l("span",{class:"token punctuation"},"{"),s("\n    "),l("span",{class:"token property"},'"build"'),l("span",{class:"token operator"},":"),s(),l("span",{class:"token string"},'"vite build"'),l("span",{class:"token punctuation"},","),s("\n    "),l("span",{class:"token property"},'"serve"'),l("span",{class:"token operator"},":"),s(),l("span",{class:"token string"},'"vite preview"'),s("\n  "),l("span",{class:"token punctuation"},"}"),s("\n"),l("span",{class:"token punctuation"},"}"),s("\n")])])],-1),l("p",null,[s("Важно, что "),l("code",null,"vite preview"),s(" предназначен для предпросмотра сборки локально и не подразумевается как production сервер.")],-1),l("div",{class:"tip custom-block"},[l("p",{class:"custom-block-title"},"Заметка"),l("p",null,[s("Это руководство предоставляет инструкции для выполнения статического деплоя вашего Vite сайта. Vite также имеет экспериментальную поддержку для Server Side Rendering'а. SSR относится к front-end фреймворкам, которые могут запускать одно и тоже приложение на Node.js, использовать pre-rendering в HTML, и наконец-то гидратировать (hydrating) это на клиенте. Ознакомьтесь с "),l("a",{href:"./ssr.html"},"SSR руководство"),s(" чтобы узнать больше об этом. С другой стороны, если Вы ищете интеграцию с традиционными server-side фреймворками, посмотрите лучше вот это "),l("a",{href:"./backend-integration.html"},"Backend Integration guide"),s(".")])],-1),l("h2",{id:"сборка-приnожения",tabindex:"-1"},[s("Сборка приложения "),l("a",{class:"header-anchor",href:"#сборка-приnожения","aria-hidden":"true"},"#")],-1),l("p",null,[s("Вы можете запустить команду "),l("code",null,"npm run build"),s(", чтобы собрать приложение.")],-1),l("div",{class:"language-bash"},[l("pre",null,[l("code",null,[s("$ "),l("span",{class:"token function"},"npm"),s(" run build\n")])])],-1),l("p",null,[s("По умолчанию, output сборки будет размещён в папке "),l("code",null,"dist"),s(". Вы можете вылить эту папку "),l("code",null,"dist"),s(" на любую нужную вам платформу.")],-1),l("h3",{id:"локаnьное-тестирование-приnожения",tabindex:"-1"},[s("Локальное тестирование приложения "),l("a",{class:"header-anchor",href:"#локаnьное-тестирование-приnожения","aria-hidden":"true"},"#")],-1),l("p",null,[s("Разработав приложение, Вы можете протестировать его локально запустив команду "),l("code",null,"npm run serve"),s(".")],-1),l("div",{class:"language-bash"},[l("pre",null,[l("code",null,[s("$ "),l("span",{class:"token function"},"npm"),s(" run build\n$ "),l("span",{class:"token function"},"npm"),s(" run serve\n")])])],-1),l("p",null,[s("Команда "),l("code",null,"vite preview"),s(" поднимет локальный статичный веб сервер, который будет обрабатывать файлы из папки "),l("code",null,"dist"),s(" по адресу "),l("a",{href:"http://localhost:5000",target:"_blank",rel:"noopener noreferrer"},"http://localhost:5000"),s(". Это самый лёгкий путь, чтобы проверить локально, что ваша production сборка (build) в порядке.")],-1),l("p",null,[s("Вы можете настроить порт сервера, передав флаг "),l("code",null,"--port"),s(" как аргумент.")],-1),l("div",{class:"language-json"},[l("pre",null,[l("code",null,[l("span",{class:"token punctuation"},"{"),s("\n  "),l("span",{class:"token property"},'"scripts"'),l("span",{class:"token operator"},":"),s(),l("span",{class:"token punctuation"},"{"),s("\n    "),l("span",{class:"token property"},'"serve"'),l("span",{class:"token operator"},":"),s(),l("span",{class:"token string"},'"vite preview --port 8080"'),s("\n  "),l("span",{class:"token punctuation"},"}"),s("\n"),l("span",{class:"token punctuation"},"}"),s("\n")])])],-1),l("p",null,[s("Сейчас "),l("code",null,"preview"),s(" метод запустит сервер на "),l("a",{href:"http://localhost:8080",target:"_blank",rel:"noopener noreferrer"},"http://localhost:8080"),s(".")],-1),l("div",{class:"tip custom-block"},[l("p",{class:"custom-block-title"},"Заметка"),l("p",null,[s("Если вы поменяете название скрипта с "),l("code",null,"serve"),s(" на "),l("code",null,"preview"),s(", то вы можете столкнуться с некоторыми проблемами package managers, связанными со способом их обработки "),l("a",{href:"https://docs.npmjs.com/cli/v7/using-npm/scripts#pre--post-scripts",target:"_blank",rel:"noopener noreferrer"},"Pre & Post scripts"),s(".")])],-1),l("h2",{id:"github-pages",tabindex:"-1"},[s("GitHub Pages "),l("a",{class:"header-anchor",href:"#github-pages","aria-hidden":"true"},"#")],-1),l("ol",null,[l("li",null,[l("p",null,[s("Установите корректный "),l("code",null,"base"),s(" в "),l("code",null,"vite.config.js"),s(".")]),l("p",null,[s("Если Вы деплоите на "),l("code",null,"https://<USERNAME>.github.io/"),s(", вы можете не менять "),l("code",null,"base"),s(" так как по умолчанию это "),l("code",null,"'/'"),s(".")]),l("p",null,[s("Если вы деплоите на "),l("code",null,"https://<USERNAME>.github.io/<REPO>/"),s(", например, ваш репозиторий"),l("code",null,"https://github.com/<USERNAME>/<REPO>"),s(", то установите "),l("code",null,"base"),s(" в значение "),l("code",null,"'/<REPO>/'"),s(".")])]),l("li",null,[l("p",null,[s("Внутри вашего проекта, создайте файл "),l("code",null,"deploy.sh"),s(" со следующим содержимым (с правильно раскомментированными выделенными строками), и выполните файл как bash команду для деплоя:")]),l("div",{class:"language-bash"},[l("div",{class:"highlight-lines"},[l("br"),l("br"),l("br"),l("br"),l("br"),l("br"),l("br"),l("br"),l("br"),l("br"),l("br"),l("br"),l("div",{class:"highlighted"}," "),l("br"),l("br"),l("br"),l("br"),l("br"),l("br"),l("div",{class:"highlighted"}," "),l("br"),l("br"),l("div",{class:"highlighted"}," "),l("br"),l("br"),l("br")]),l("pre",null,[l("code",null,[l("span",{class:"token shebang important"},"#!/usr/bin/env sh"),s("\n\n"),l("span",{class:"token comment"},"# abort on errors"),s("\n"),l("span",{class:"token builtin class-name"},"set"),s(" -e\n\n"),l("span",{class:"token comment"},"# build"),s("\n"),l("span",{class:"token function"},"npm"),s(" run build\n\n"),l("span",{class:"token comment"},"# navigate into the build output directory"),s("\n"),l("span",{class:"token builtin class-name"},"cd"),s(" dist\n\n"),l("span",{class:"token comment"},"# если вы деплоите на кастомный домен"),s("\n"),l("span",{class:"token comment"},"# echo 'www.example.com' > CNAME"),s("\n\n"),l("span",{class:"token function"},"git"),s(" init\n"),l("span",{class:"token function"},"git"),s(),l("span",{class:"token function"},"add"),s(" -A\n"),l("span",{class:"token function"},"git"),s(" commit -m "),l("span",{class:"token string"},"'deploy'"),s("\n\n"),l("span",{class:"token comment"},"# если вы деплоите на https://<USERNAME>.github.io"),s("\n"),l("span",{class:"token comment"},"# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master"),s("\n\n"),l("span",{class:"token comment"},"# если вы деплоите на https://<USERNAME>.github.io/<REPO>"),s("\n"),l("span",{class:"token comment"},"# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages"),s("\n\n"),l("span",{class:"token builtin class-name"},"cd"),s(" -\n")])])])])],-1),l("div",{class:"tip custom-block"},[l("p",{class:"custom-block-title"},"Подсказка"),l("p",null,"Вы также можете запускать вышеуказанный скрипт в вашей CI настройке, чтобы иметь автоматический деплой при каждом пуше новых изменений.")],-1),l("h3",{id:"github-pages-и-travis-ci",tabindex:"-1"},[s("GitHub Pages и Travis CI "),l("a",{class:"header-anchor",href:"#github-pages-и-travis-ci","aria-hidden":"true"},"#")],-1),l("ol",null,[l("li",null,[l("p",null,[s("Установите нужный "),l("code",null,"base"),s(" в "),l("code",null,"vite.config.js"),s(".")]),l("p",null,[s("Если вы деплоите на "),l("code",null,"https://<USERNAME or GROUP>.github.io/"),s(", вы можете не указывать "),l("code",null,"base"),s(" так как по умолчанию он "),l("code",null,"'/'"),s(".")]),l("p",null,[s("Если вы деплоите на "),l("code",null,"https://<USERNAME or GROUP>.github.io/<REPO>/"),s(", например, ваш репозиторий "),l("code",null,"https://github.com/<USERNAME>/<REPO>"),s(", тогда установите"),l("code",null,"base"),s(" в значение "),l("code",null,"'/<REPO>/'"),s(".")])]),l("li",null,[l("p",null,[s("Создайте файл с именем"),l("code",null,".travis.yml"),s(" в корне вашего проекта.")])]),l("li",null,[l("p",null,[s("Запустите команду "),l("code",null,"npm install"),s(" локально и закоммитьте сгенерированный lockfile ("),l("code",null,"package-lock.json"),s(").")])]),l("li",null,[l("p",null,[s("Используйте GitHub Pages deploy provider template, и следуйте "),l("a",{href:"https://docs.travis-ci.com/user/deployment/pages/",target:"_blank",rel:"noopener noreferrer"},"Travis CI документации"),s(".")]),l("div",{class:"language-yaml"},[l("pre",null,[l("code",null,[l("span",{class:"token key atrule"},"language"),l("span",{class:"token punctuation"},":"),s(" node_js\n"),l("span",{class:"token key atrule"},"node_js"),l("span",{class:"token punctuation"},":"),s("\n  "),l("span",{class:"token punctuation"},"-"),s(" lts/*\n"),l("span",{class:"token key atrule"},"install"),l("span",{class:"token punctuation"},":"),s("\n  "),l("span",{class:"token punctuation"},"-"),s(" npm ci\n"),l("span",{class:"token key atrule"},"script"),l("span",{class:"token punctuation"},":"),s("\n  "),l("span",{class:"token punctuation"},"-"),s(" npm run build\n"),l("span",{class:"token key atrule"},"deploy"),l("span",{class:"token punctuation"},":"),s("\n  "),l("span",{class:"token key atrule"},"provider"),l("span",{class:"token punctuation"},":"),s(" pages\n  "),l("span",{class:"token key atrule"},"skip_cleanup"),l("span",{class:"token punctuation"},":"),s(),l("span",{class:"token boolean important"},"true"),s("\n  "),l("span",{class:"token key atrule"},"local_dir"),l("span",{class:"token punctuation"},":"),s(" dist\n  "),l("span",{class:"token comment"},"# A token generated on GitHub allowing Travis to push code on you repository."),s("\n  "),l("span",{class:"token comment"},"# Set in the Travis settings page of your repository, as a secure variable."),s("\n  "),l("span",{class:"token key atrule"},"github_token"),l("span",{class:"token punctuation"},":"),s(" $GITHUB_TOKEN\n  "),l("span",{class:"token key atrule"},"keep_history"),l("span",{class:"token punctuation"},":"),s(),l("span",{class:"token boolean important"},"true"),s("\n  "),l("span",{class:"token key atrule"},"on"),l("span",{class:"token punctuation"},":"),s("\n    "),l("span",{class:"token key atrule"},"branch"),l("span",{class:"token punctuation"},":"),s(" master\n")])])])])],-1),l("h2",{id:"gitlab-pages-и-gitlab-ci",tabindex:"-1"},[s("GitLab Pages и GitLab CI "),l("a",{class:"header-anchor",href:"#gitlab-pages-и-gitlab-ci","aria-hidden":"true"},"#")],-1),l("ol",null,[l("li",null,[l("p",null,[s("Установите нужный "),l("code",null,"base"),s(" в"),l("code",null,"vite.config.js"),s(".")]),l("p",null,[s("Если вы деплоите на "),l("code",null,"https://<USERNAME or GROUP>.gitlab.io/"),s(", вы можете не указывать "),l("code",null,"base"),s(" так как по умолчанию он "),l("code",null,"'/'"),s(".")]),l("p",null,[s("Если вы деплоите на "),l("code",null,"https://<USERNAME or GROUP>.gitlab.io/<REPO>/"),s(", например, ваш репозиторий "),l("code",null,"https://gitlab.com/<USERNAME>/<REPO>"),s(", то установите "),l("code",null,"base"),s(" в значение "),l("code",null,"'/<REPO>/'"),s(".")])]),l("li",null,[l("p",null,[s("Создайте файл с названием "),l("code",null,".gitlab-ci.yml"),s(" в корневой директории вашего проекта с содержимым, приведённым ниже. Это соберёт и задеплоит ваш сайт когда бы вы не сделали изменения в вашем контенте:")]),l("div",{class:"language-yaml"},[l("pre",null,[l("code",null,[l("span",{class:"token key atrule"},"image"),l("span",{class:"token punctuation"},":"),s(" node"),l("span",{class:"token punctuation"},":"),s("16.5.0\n"),l("span",{class:"token key atrule"},"pages"),l("span",{class:"token punctuation"},":"),s("\n  "),l("span",{class:"token key atrule"},"stage"),l("span",{class:"token punctuation"},":"),s(" deploy\n  "),l("span",{class:"token key atrule"},"cache"),l("span",{class:"token punctuation"},":"),s("\n    "),l("span",{class:"token key atrule"},"key"),l("span",{class:"token punctuation"},":"),s("\n      "),l("span",{class:"token key atrule"},"files"),l("span",{class:"token punctuation"},":"),s("\n        "),l("span",{class:"token punctuation"},"-"),s(" package"),l("span",{class:"token punctuation"},"-"),s("lock.json\n      "),l("span",{class:"token key atrule"},"prefix"),l("span",{class:"token punctuation"},":"),s(" npm\n    "),l("span",{class:"token key atrule"},"paths"),l("span",{class:"token punctuation"},":"),s("\n      "),l("span",{class:"token punctuation"},"-"),s(" node_modules/\n  "),l("span",{class:"token key atrule"},"script"),l("span",{class:"token punctuation"},":"),s("\n    "),l("span",{class:"token punctuation"},"-"),s(" npm install\n    "),l("span",{class:"token punctuation"},"-"),s(" npm run build\n    "),l("span",{class:"token punctuation"},"-"),s(" cp "),l("span",{class:"token punctuation"},"-"),s("a dist/. public/\n  "),l("span",{class:"token key atrule"},"artifacts"),l("span",{class:"token punctuation"},":"),s("\n    "),l("span",{class:"token key atrule"},"paths"),l("span",{class:"token punctuation"},":"),s("\n      "),l("span",{class:"token punctuation"},"-"),s(" public\n  "),l("span",{class:"token key atrule"},"rules"),l("span",{class:"token punctuation"},":"),s("\n    "),l("span",{class:"token punctuation"},"-"),s(" $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH\n")])])])])],-1),l("h2",{id:"netlify",tabindex:"-1"},[s("Netlify "),l("a",{class:"header-anchor",href:"#netlify","aria-hidden":"true"},"#")],-1),l("ol",null,[l("li",null,[l("p",null,[s("На "),l("a",{href:"https://netlify.com",target:"_blank",rel:"noopener noreferrer"},"Netlify"),s(", настройте новый проект из GitHub со следующими настройками:")]),l("ul",null,[l("li",null,[l("strong",null,"Build Command:"),s(),l("code",null,"vite build"),s(" или "),l("code",null,"npm run build")]),l("li",null,[l("strong",null,"Publish directory:"),s(),l("code",null,"dist")])])]),l("li",null,[l("p",null,"Нажмите кнопку deploy.")])],-1),l("h2",{id:"google-firebase",tabindex:"-1"},[s("Google Firebase "),l("a",{class:"header-anchor",href:"#google-firebase","aria-hidden":"true"},"#")],-1),l("ol",null,[l("li",null,[l("p",null,[s("Убедитесь что у вас есть установленный "),l("a",{href:"https://www.npmjs.com/package/firebase-tools",target:"_blank",rel:"noopener noreferrer"},"firebase-tools"),s(".")])]),l("li",null,[l("p",null,[s("Создайте файлы "),l("code",null,"firebase.json"),s(" и "),l("code",null,".firebaserc"),s(" в корневой директории вашего проекта со следующим содержимым:")]),l("p",null,[l("code",null,"firebase.json"),s(":")]),l("div",{class:"language-json"},[l("pre",null,[l("code",null,[l("span",{class:"token punctuation"},"{"),s("\n  "),l("span",{class:"token property"},'"hosting"'),l("span",{class:"token operator"},":"),s(),l("span",{class:"token punctuation"},"{"),s("\n    "),l("span",{class:"token property"},'"public"'),l("span",{class:"token operator"},":"),s(),l("span",{class:"token string"},'"dist"'),l("span",{class:"token punctuation"},","),s("\n    "),l("span",{class:"token property"},'"ignore"'),l("span",{class:"token operator"},":"),s(),l("span",{class:"token punctuation"},"["),l("span",{class:"token punctuation"},"]"),s("\n  "),l("span",{class:"token punctuation"},"}"),s("\n"),l("span",{class:"token punctuation"},"}"),s("\n")])])]),l("p",null,[l("code",null,".firebaserc"),s(":")]),l("div",{class:"language-js"},[l("pre",null,[l("code",null,[l("span",{class:"token punctuation"},"{"),s("\n  "),l("span",{class:"token string"},'"projects"'),l("span",{class:"token operator"},":"),s(),l("span",{class:"token punctuation"},"{"),s("\n    "),l("span",{class:"token string"},'"default"'),l("span",{class:"token operator"},":"),s(),l("span",{class:"token string"},'"<YOUR_FIREBASE_ID>"'),s("\n  "),l("span",{class:"token punctuation"},"}"),s("\n"),l("span",{class:"token punctuation"},"}"),s("\n")])])])]),l("li",null,[l("p",null,[s("После запуска команды "),l("code",null,"npm run build"),s(", задеплойте используя команду "),l("code",null,"firebase deploy"),s(".")])])],-1),l("h2",{id:"surge",tabindex:"-1"},[s("Surge "),l("a",{class:"header-anchor",href:"#surge","aria-hidden":"true"},"#")],-1),l("ol",null,[l("li",null,[l("p",null,[s("Сначала установите "),l("a",{href:"https://www.npmjs.com/package/surge",target:"_blank",rel:"noopener noreferrer"},"surge"),s(", если вы ещё этого не сделали.")])]),l("li",null,[l("p",null,[s("Запустите "),l("code",null,"npm run build"),s(".")])]),l("li",null,[l("p",null,[s("Задеплойте, набрав "),l("code",null,"surge dist"),s(".")])])],-1),l("p",null,[s("Вы также можете деплоить на кастомный домен "),l("a",{href:"http://surge.sh/help/adding-a-custom-domain",target:"_blank",rel:"noopener noreferrer"},"custom domain"),s(" добавив "),l("code",null,"surge dist yourdomain.com"),s(".")],-1),l("h2",{id:"heroku",tabindex:"-1"},[s("Heroku "),l("a",{class:"header-anchor",href:"#heroku","aria-hidden":"true"},"#")],-1),l("ol",null,[l("li",null,[l("p",null,[s("Установите "),l("a",{href:"https://devcenter.heroku.com/articles/heroku-cli",target:"_blank",rel:"noopener noreferrer"},"Heroku CLI"),s(".")])]),l("li",null,[l("p",null,[s("Создайте Heroku аккаунт с помощью "),l("a",{href:"https://signup.heroku.com",target:"_blank",rel:"noopener noreferrer"},"signing up"),s(".")])]),l("li",null,[l("p",null,[s("Запустите "),l("code",null,"heroku login"),s(" и залогиньтесь:")]),l("div",{class:"language-bash"},[l("pre",null,[l("code",null,"$ heroku login\n")])])]),l("li",null,[l("p",null,[s("Создайте файл с именем"),l("code",null,"static.json"),s(" в корневом каталоге вашего проекта со следующим контентом:")]),l("p",null,[l("code",null,"static.json"),s(":")]),l("div",{class:"language-json"},[l("pre",null,[l("code",null,[l("span",{class:"token punctuation"},"{"),s("\n  "),l("span",{class:"token property"},'"root"'),l("span",{class:"token operator"},":"),s(),l("span",{class:"token string"},'"./dist"'),s("\n"),l("span",{class:"token punctuation"},"}"),s("\n")])])]),l("p",null,[s("Это конфигурация вашего сайта; читайте больше тут "),l("a",{href:"https://github.com/heroku/heroku-buildpack-static",target:"_blank",rel:"noopener noreferrer"},"heroku-buildpack-static"),s(".")])]),l("li",null,[l("p",null,"Настройте ваш Heroku git remote:"),l("div",{class:"language-bash"},[l("pre",null,[l("code",null,[l("span",{class:"token comment"},"# version change"),s("\n$ "),l("span",{class:"token function"},"git"),s(" init\n$ "),l("span",{class:"token function"},"git"),s(),l("span",{class:"token function"},"add"),s(),l("span",{class:"token builtin class-name"},"."),s("\n$ "),l("span",{class:"token function"},"git"),s(" commit -m "),l("span",{class:"token string"},'"My site ready for deployment."'),s("\n\n"),l("span",{class:"token comment"},"# creates a new app with a specified name"),s("\n$ heroku apps:create example\n\n"),l("span",{class:"token comment"},"# set buildpack for static sites"),s("\n$ heroku buildpacks:set https://github.com/heroku/heroku-buildpack-static.git\n")])])])]),l("li",null,[l("p",null,"Задеплойте свой сайт:"),l("div",{class:"language-bash"},[l("pre",null,[l("code",null,[l("span",{class:"token comment"},"# publish site"),s("\n$ "),l("span",{class:"token function"},"git"),s(" push heroku master\n\n"),l("span",{class:"token comment"},"# opens a browser to view the Dashboard version of Heroku CI"),s("\n$ heroku "),l("span",{class:"token function"},"open"),s("\n")])])])])],-1),l("h2",{id:"vercel",tabindex:"-1"},[s("Vercel "),l("a",{class:"header-anchor",href:"#vercel","aria-hidden":"true"},"#")],-1),l("p",null,[s("Чтобы задеплоить ваше Vite приложение с помощью "),l("a",{href:"https://vercel.com/docs/git",target:"_blank",rel:"noopener noreferrer"},"Vercel for Git"),s(", убедитесь, что проект был запушен в Git репозиторий.")],-1),l("p",null,[s("Перейдите на "),l("a",{href:"https://vercel.com/import/git",target:"_blank",rel:"noopener noreferrer"},"https://vercel.com/import/git"),s(" и импортируйте проект в Vercel выбрав Git из меню (GitHub, GitLab or BitBucket). Следуйте указаниями, чтобы выбрать корневой каталог проекта с "),l("code",null,"package.json"),s(" и перезапишите build step используя "),l("code",null,"npm run build"),s(" и output dir будет "),l("code",null,"./dist")],-1),l("p",null,[l("img",{src:"/assets/vercel-configuration.1bc6b406.png",alt:"Override Vercel Configuration"})],-1),l("p",null,'После того как ваш проект симпортирован, все последующие пуши в ветки сгенерируют Preview Deployments, и все изменения сделанные в (обычно это "main") отразятся в Production Deployment.',-1),l("p",null,[s("Задеплоив свой преокт один раз, вы получите URL адрес, чтобы смотреть на своё приложение в живую, как пример: "),l("a",{href:"https://vite.vercel.app",target:"_blank",rel:"noopener noreferrer"},"https://vite.vercel.app")],-1),l("h2",{id:"azure-static-web-apps",tabindex:"-1"},[s("Azure Static Web Apps "),l("a",{class:"header-anchor",href:"#azure-static-web-apps","aria-hidden":"true"},"#")],-1),l("p",null,[s("Вы можете быстро задеплоить ваше Vite приложение с помощью сервиса Microsoft Azure "),l("a",{href:"https://aka.ms/staticwebapps",target:"_blank",rel:"noopener noreferrer"},"Static Web Apps"),s(". Вам нужно:")],-1),l("ul",null,[l("li",null,[s("Azure аккаунт и subscription key. Вы можете создать "),l("a",{href:"https://azure.microsoft.com/free",target:"_blank",rel:"noopener noreferrer"},"бесплатный Azure аккаунт здесь"),s(".")]),l("li",null,[s("Код вашего приложения пушите на "),l("a",{href:"https://github.com",target:"_blank",rel:"noopener noreferrer"},"GitHub"),s(".")]),l("li",null,[l("a",{href:"https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurestaticwebapps",target:"_blank",rel:"noopener noreferrer"},"SWA Extension"),s(" в "),l("a",{href:"https://code.visualstudio.com",target:"_blank",rel:"noopener noreferrer"},"Visual Studio Code"),s(".")])],-1),l("p",null,[s("Установите расширение для VS Code и перейдите в корень вашего приложения. Откройте Static Web Apps extension, залогиньтесь в Azure и нажмите "),l("code",null,"+"),s(" знак для создания нового Static Web App. Вас попросят указать, какой subscription key использовать.")],-1),l("p",null,[s("Следуйте инструкциям из расширения, чтобы дать вашему приложению имя, выберите настройки фреймворка и укажите корень приложения (обычно "),l("code",null,"/"),s(") и built file location (путь для сборки) "),l("code",null,"/dist"),s(". Программа запуститься и создаст GitHub action в вашем репозитории в папке "),l("code",null,".github"),s(".")],-1),l("p",null,"Это действие будет работать, чтобы деплоить ваше приложение (смотрите прогресс в вашем репо, во вкладке Actions) и когда это успешно завершится, вы сможете увидеть своей приложение по адресу, предоставленному окном расширения, когда нажмете 'Browse Website' кнопку, она появится когда GitHub action запуститься.",-1)];a.render=function(l,s,t,a,u,r){return n(),e("div",null,o)};export{t as __pageData,a as default};
