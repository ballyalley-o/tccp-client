import type { Bootcamp } from 'types'

export const KEY = {
    ROLE         : ['student', 'trainer', 'admin'] as const,
    CAREER_OPTION: [
        'career_options.web_development',
        'career_options.mobile_development',
        'career_options.ui_ux',
        'career_options.data_science',
        'career_options.data_security',
        'career_options.software_engineering',
        'career_options.full_stack_web_development',
        'career_options.dev_ops',
        'career_options.ai',
        'career_options.machine_learning',
        'career_options.cloud_computing',
        'career_options.cyber_security',
        'career_options.other'
    ] as const,
    MINIMUM_SKILL: ['beginner', 'intermediate', 'advanced'] as const,
    TRAIT        : ['housing', 'jobAssistance', 'jobGuarantee', 'acceptGi'] as const,
    TRAIT_OPTION : (selected: Bootcamp) => [
        ['traits.housing', selected.housing],
        ['traits.job_assistance', selected.jobAssistance],
        ['traits.job_guarantee', selected.jobGuarantee],
        ['traits.gi_bill_accepted', selected.acceptGi],
    ]
}
