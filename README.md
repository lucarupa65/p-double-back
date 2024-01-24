<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Dev

1. Copiar el ```env.template``` y renombre a ```.env```
2. Ejecutar ``` yarn install ```
3. Levantar la imagen ``` docker-compose up -d ```
4. Levantar el backend de Nest ``` yarn start:dev ```
5. Visiar el sitio ``` localhost:3000/graphql ```
6. Ejecutar la __"mutation"__ executeSeed, para llenar la base de datos con información

# Para ejecutarlo con docker
1. Copiar el ```env.template``` y renombre a ```.env.prod```
2. Ejecutar el comenado 
```
docker-compose -f docker-compose.prod.yml --env-file .env.prod up --build
```
3. Visiar el sitio ``` localhost:3000/graphql ```
4. Ejecutar la __"mutation"__ executeSeed, para llenar la base de datos con información