require('dotenv').config()

const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const MetaProvider = require('@bot-whatsapp/provider/meta')
const MockAdapter = require('@bot-whatsapp/database/mock')

/**
 * Aqui declaramos los flujos hijos, los flujos se declaran de atras para adelante, es decir que si tienes un flujo de este tipo:
 *
 *          Menu Principal
 *           - SubMenu 1
 *             - Submenu 1.1
 *           - Submenu 2
 *             - Submenu 2.1
 *
 * Primero declaras los submenus 1.1 y 2.1, luego el 1 y 2 y al final el principal.
 */

const flowSecundario = addKeyword(['2', 'siguiente']).addAnswer(['📄 Aquí tenemos el flujo secundario'])

const flowDocs = addKeyword(['doc', 'documentacion', 'documentación']).addAnswer(
    [
        '📄 Aquí encontras las documentación recuerda que puedes mejorarla',
        'https://bot-whatsapp.netlify.app/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowTuto = addKeyword(['tutorial', 'tuto']).addAnswer(
    [
        '🙌 Aquí encontras un ejemplo rapido',
        'https://bot-whatsapp.netlify.app/docs/example/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)


const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowSecundario])

    const adapterProvider = createProvider(MetaProvider, {
        jwtToken: EAAC1uaU7d4YBABw1Y9PLj5EyANRbt5ukacjNcjVW1c4ZBbb9vN4ZCpEDfCFdBWZCkQioWdXxGbRIs12X8pZAoIZCJIQlsBXcAi2vkCSmzZBmbrToxRXyuCQdOqdiVebFbCbmbODfTm5IzJQtUC1UlXiZB8p5aeUEzUPsymo2e9tBBzZCl6eQNCEKyZC0qkxFjx1SbFIMVZCycQYAZDZD,
        numberId: 110570088696939,
        verifyToken: 'WspBusiness',
    })

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })
}

main()
