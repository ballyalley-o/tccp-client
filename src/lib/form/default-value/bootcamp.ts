import type { BootcampDraft } from 'types'
import { transl } from 'lib/tool'

export const bootcampDefaultValue: BootcampDraft = {
    name         : '',
    description  : '',
    website      : '',
    phone        : '',
    email        : '',
    address      : '',
    duration     : '',
    careers      : [transl('career_options.web_development')],
    housing      : false,
    jobAssistance: false,
    jobGuarantee : false,
    acceptGi     : false
}