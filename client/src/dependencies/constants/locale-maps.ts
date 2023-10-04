import enCommons from '../../locales/en/en.commons.json'
import enFeatAuth from '../../locales/en/en.feat-auth.json'
import enFeatChat from '../../locales/en/en.feat-chat.json'
import enFeatUser from '../../locales/en/en.feat-user.json'
import enFeatOccupant from '../../locales/en/en.feat-occupant.json'

import idCommons from '../../locales/id/id.commons.json'
import idFeatAuth from '../../locales/id/id.feat-auth.json'
import idFeatChat from '../../locales/id/id.feat-chat.json'
import idFeatUser from '../../locales/id/id.feat-user.json'
import idFeatOccupant from '../../locales/id/id.feat-occupant.json'

/**
 * Creates an initial locales object with English and Indonesian translations.
 *
 * @returns {object} - An object containing initial translations for English and Indonesian languages.
 */
const createInitLocales = () => {
  const enLanguages = {}
  const idLanguages = {}

  // You can customize the objects being assigned here as needed.
  Object.assign(enLanguages, enCommons, enFeatAuth, enFeatChat, enFeatUser, enFeatOccupant)
  Object.assign(idLanguages, idCommons, idFeatAuth, idFeatChat, idFeatUser, idFeatOccupant)
  
  return {
    en: { translation: enLanguages },
    id: { translation: idLanguages },
  }
}

export { createInitLocales }
