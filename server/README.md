**\*Requirements : NodeJS v16.16.0, MySQL, Expresso, Sequelize**

# 1. INSTALLATION

1. Clone repository `git clone https://github.com/Abizrh/luxydence.git`
3. Install dependency using `pnpm install`
4. Create a new database on your machine
5. Setup the .env file
6. Run migration using `npx sequelize-cli db:migrate`
7. Run seeder using `npx sequelize-cli db:seed:all`
8. Start server using `pnpm dev`

## Endpoints

List of available endpoints:

- `POST /v1/auth/register`
- `POST /v1/auth/login`
- `POST /v1/auth/refresh`
- `GET /v1/dues`
- `GET /v1/dues/:id`
- `POST /v1/dues`
- `PUT /v1/dues/:id`
- `DELETE /v1/dues/:id`
- `GET /v1/occupants`
- `GET /v1/occupants/:id`
- `POST /v1/occupants`
- `PUT /v1/occupants/:id`
- `DELETE /v1/occupants/:id`
- `GET /v1/houses`
- `GET /v1/houses/:id`
- `POST /v1/houses`
- `PUT /v1/houses/:id`
- `DELETE /v1/houses/:id`
- `GET /v1/payments`
- `GET /v1/payments/:id`
- `POST /v1/payments`
- `PUT /v1/payments/:id`
- `PUT /v1/payments/process/:id`
- `DELETE /v1/payments/:id`
