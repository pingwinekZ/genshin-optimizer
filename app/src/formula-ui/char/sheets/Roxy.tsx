import type { CharacterKey } from '../../../consts'
import { useCharacter } from '../../../db-ui'
import { Roxy } from '../../../formula'
import { GameDesc, GameDescSlice } from '../../../i18n'
import { trans } from '../../util'
import { AbilityBodyText, createBaseSheet, fieldForBuff } from '../sheetUtil'

const key: CharacterKey = 'Roxy'
const [, ch] = trans('char', key)
const cond = Roxy.conditionals
const buff = Roxy.buffs
const ns = 'char_Roxy_gen'

function useCoreKey(paragraph: number) {
  const char = useCharacter(key)
  const coreLevel = char?.core ?? 0
  return `core.desc.${coreLevel}.${paragraph}`
}

// Core p1: Energy Regen → ATK / Impact (single sentence, so the slice covers
// the whole paragraph regardless of per-level numbers).
function CoreRegenDescription() {
  const key18 = useCoreKey(1)
  return (
    <GameDescSlice
      ns={ns}
      key18={key18}
      from="When Roxy's initial"
      to="Impact increases by 0.4"
    />
  )
}

// Core p3: Contamination / Cleanse team buff.
function ContaminationSurgeDescription() {
  const key18 = useCoreKey(3)
  const cleanseKey = useCoreKey(2)
  const reapplyKey = useCoreKey(4)
  return (
    <>
      <GameDescSlice
        ns={ns}
        key18={key18}
        from="When any squad member triggers"
        to="repeated triggers reset the duration."
      />
      <div style={{ marginTop: 8 }} />
      <GameDesc ns={ns} key18={cleanseKey} />
      <div style={{ marginTop: 8 }} />
      <GameDesc ns={ns} key18={reapplyKey} />
    </>
  )
}

const sheet = createBaseSheet(key, {
  core: [
    {
      type: 'fields',
      header: { icon: null, text: ch('core_regen_header') },
      description: <CoreRegenDescription />,
      fields: [
        fieldForBuff(buff.core_regen_atk),
        fieldForBuff(buff.core_regen_impact),
      ],
    },
    {
      type: 'conditional',
      conditional: {
        label: ch('contaminationSurgeCond'),
        description: <ContaminationSurgeDescription />,
        metadata: cond.contaminationSurge,
        fields: [
          fieldForBuff(buff.core_team_crit_dmg_),
          fieldForBuff(buff.core_team_laceration_),
        ],
      },
    },
  ],
  ability: [
    {
      type: 'fields',
      header: { icon: null, text: ch('ability_header') },
      description: (
        <>
          <GameDesc ns={ns} key18="ability.desc.0" />
          <AbilityBodyText characterKey={key}>
            <GameDescSlice
              ns={ns}
              key18="ability.desc.1"
              from="Roxy's DMG increases by"
              to="up to 80%."
            />
          </AbilityBodyText>
          <div style={{ marginTop: 8 }} />
          <GameDesc ns={ns} key18="ability.desc.4" />
          <div style={{ marginTop: 8 }} />
          <GameDesc ns={ns} key18="ability.desc.5" />
        </>
      ),
      fields: [fieldForBuff(buff.ability_self_dmg_)],
    },
    {
      type: 'fields',
      header: { icon: null, text: ch('ability_stun_header') },
      description: (
        <>
          <GameDesc ns={ns} key18="ability.desc.0" />
          <AbilityBodyText characterKey={key}>
            <GameDescSlice
              ns={ns}
              key18="ability.desc.2"
              from="When any squad member's attack hits an enemy"
              to="once the Stun ends."
            />
          </AbilityBodyText>
        </>
      ),
      fields: [fieldForBuff(buff.ability_stun_)],
    },
    {
      type: 'conditional',
      conditional: {
        label: ch('windsweptCond'),
        description: (
          <GameDescSlice
            ns={ns}
            key18="ability.desc.3"
            from="While an enemy is in the"
            to="are increased by 8%."
          />
        ),
        metadata: cond.windsweptVulnerability,
        fields: [fieldForBuff(buff.ability_windswept_dmgInc_)],
      },
    },
    {
      type: 'conditional',
      conditional: {
        label: ch('exAnomalyCond'),
        description: (
          <GameDescSlice
            ns={ns}
            key18="ability.desc.6"
            from="When using an"
            to="Repeated triggers reset the duration."
          />
        ),
        metadata: cond.exAnomalySurge,
        fields: [fieldForBuff(buff.ability_ex_anomBuildup_)],
      },
    },
  ],
  m1: [
    {
      type: 'conditional',
      conditional: {
        label: ch('m1Cond'),
        description: (
          <GameDescSlice
            ns={ns}
            key18="mindscapes.1.desc"
            from="it reduces the enemy's All-Attribute RES"
            to="Repeated triggers reset the duration."
          />
        ),
        metadata: cond.m1ResShred,
        fields: [fieldForBuff(buff.m1_allResRed_)],
      },
    },
    {
      type: 'fields',
      header: { icon: null, text: ch('m1_crit_header') },
      description: (
        <GameDescSlice
          ns={ns}
          key18="mindscapes.1.desc"
          from="CRIT DMG increases by"
          to="40%."
        />
      ),
      fields: [fieldForBuff(buff.m1_crit_dmg_)],
    },
  ],
  m2: [
    {
      type: 'fields',
      header: { icon: null, text: ch('m2_exDaze_header') },
      description: (
        <>
          <GameDescSlice
            ns={ns}
            key18="mindscapes.2.desc.0"
            from="deals 5%"
            to="more Daze."
          />
          <div style={{ marginTop: 8 }} />
          <GameDesc ns={ns} key18="mindscapes.2.desc.1" />
          <div style={{ marginTop: 8 }} />
          <GameDesc ns={ns} key18="mindscapes.2.desc.2" />
        </>
      ),
      fields: [fieldForBuff(buff.m2_ex_daze_)],
    },
    {
      type: 'conditional',
      conditional: {
        label: ch('m2Cond'),
        description: (
          <GameDescSlice
            ns={ns}
            key18="mindscapes.2.desc.3"
            from="When"
            to="recovers from Stun."
          />
        ),
        metadata: cond.m2StunSurge,
        fields: [fieldForBuff(buff.m2_stun_)],
      },
    },
  ],
  m4: [
    {
      type: 'fields',
      header: { icon: null, text: ch('m4_ult_header') },
      description: (
        <>
          <GameDescSlice
            ns={ns}
            key18="mindscapes.4.desc"
            from="When a"
            to="grants 2 Energy, up to once per skill."
          />
          <div style={{ marginTop: 8 }} />
          <GameDescSlice
            ns={ns}
            key18="mindscapes.4.desc"
            from="deals 20% more DMG"
            to="10% more Daze."
          />
        </>
      ),
      fields: [fieldForBuff(buff.m4_ult_dmg_), fieldForBuff(buff.m4_ult_daze_)],
    },
  ],
  m6: [
    {
      type: 'fields',
      header: { icon: null, text: ch('m6_res_header') },
      description: (
        <GameDescSlice
          ns={ns}
          key18="mindscapes.6.desc.0"
          from="The DMG dealt by attacks ignores"
          to="Wind RES"
        />
      ),
      fields: [fieldForBuff(buff.m6_wind_resIgn_)],
    },
    {
      type: 'conditional',
      conditional: {
        label: ch('m6Cond'),
        description: (
          <GameDescSlice
            ns={ns}
            key18="mindscapes.6.desc.1"
            from="When"
            to="the Daze it inflicts increases by 20%."
          />
        ),
        metadata: cond.m6Afterecho,
        fields: [
          fieldForBuff(buff.m6_afterecho_dmg_),
          fieldForBuff(buff.m6_afterecho_daze_),
        ],
      },
    },
  ],
})

export default sheet
