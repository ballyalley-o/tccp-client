import { transl as sharedTransl } from '@i18n'
import { ACTIVE_LOCALE_KEY }      from 'config/locale.config'

type   SharedLocaleKey = Parameters<typeof sharedTransl>[0]
type   ClientLocale    = AppLocale['client']
export type LocaleKey  = NestedKeys<ClientLocale>
/**
 * Retrieves a localized message based on the provided key and optional parameters.
 *
 * The function navigates through a nested object structure (assumed to be `en`)
 * using the dot-separated `key` to find the corresponding message. If the message
 * is found and is a string, it replaces placeholders in the format `{param}` with
 * the values provided in the `params` object.
 *
 * @param key {LocaleKey} - A dot-separated string representing the path to the desired message
 *                          in the localization object.
 * @param params - An optional object containing key-value pairs to replace placeholders
 *                 in the localized message.
 * @param locale - Language
 * @returns The localized message with placeholders replaced, or the original key if
 *          the message is not found or is not a string.
 */
export const transl = (key: LocaleKey, params?: LocaleParams, locale: LocaleLang = ACTIVE_LOCALE_KEY): string =>
  sharedTransl(`client.${key}` as SharedLocaleKey, params, locale)
