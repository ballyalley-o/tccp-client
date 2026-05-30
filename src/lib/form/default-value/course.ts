import { transl } from 'lib/tool'
import type { CourseDraft } from 'types/model'

export const courseDefaultValue: CourseDraft = {
  title               : '',
  description         : '',
  duration            : '',
  tuition             : 0,
  minimumSkill        : transl('minimum_skill.beginner') as AppSkillType,
  scholarshipAvailable: false
}