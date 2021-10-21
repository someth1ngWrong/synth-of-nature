import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

import Button from '../control_components/Button'

import ToneSynth from '../module_components/ToneSynth'

import AutoFilterEffect from '../module_components/AutoFilterEffect'
import AutoPannerEffect from '../module_components/AutoPannerEffect'
import AutoWahEffect from '../module_components/AutoWahEffect'
import BitCrusherEffect from '../module_components/BitCrusherEffect'
import ChebyshevEffect from '../module_components/ChebyshevEffect'
import ChorusEffect from '../module_components/ChorusEffect'
import DistortionEffect from '../module_components/DistortionEffect'
import FeedbackDelayEffect from '../module_components/FeedbackDelayEffect'
import FreeverbEffect from '../module_components/FreeverbEffect'
import FrequencyShifterEffect from '../module_components/FrequencyShifterEffect'
import JCReverbEffect from '../module_components/JCReverbEffect'
import MidSideEffect from '../module_components/MidSideEffect'
import PhaserEffect from '../module_components/PhaserEffect'
import PingPongDelayEffect from '../module_components/PingPongDelayEffect'
import PitchShiftEffect from '../module_components/PitchShiftEffect'
import ReverbEffect from '../module_components/ReverbEffect'
import StereoWidenerEffect from '../module_components/StereoWidenerEffect'
import TremoloEffect from '../module_components/TremoloEffect'
import VibratoEffect from '../module_components/VibratoEffect'

import Channel from '../module_components/Channel'

export default class SynthRoom extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      instruments,
      handlePropertyValueChange,
      handleSequenceChange
    } = this.props

    const instrumentElements = []

    instruments.forEach((instrument, i) => {
      const instrumentModuleElements = []

      instrument.forEach((instrumentModule, i) => {
        const { id, name, type, node, settings } = instrumentModule

        const components = {
          ToneSynth: ToneSynth,
          AutoFilterEffect: AutoFilterEffect,
          AutoPannerEffect: AutoPannerEffect,
          AutoWahEffect: AutoWahEffect,
          BitCrusherEffect: BitCrusherEffect,
          ChebyshevEffect: ChebyshevEffect,
          ChorusEffect: ChorusEffect,
          DistortionEffect: DistortionEffect,
          FeedbackDelayEffect: FeedbackDelayEffect,
          FreeverbEffect: FreeverbEffect,
          FrequencyShifterEffect: FrequencyShifterEffect,
          JCReverbEffect: JCReverbEffect,
          MidSideEffect: MidSideEffect,
          PhaserEffect: PhaserEffect,
          PingPongDelayEffect: PingPongDelayEffect,
          PitchShiftEffect: PitchShiftEffect,
          ReverbEffect: ReverbEffect,
          StereoWidenerEffect: StereoWidenerEffect,
          TremoloEffect: TremoloEffect,
          VibratoEffect: VibratoEffect,
          Channel: Channel
        }

        const ComponentType = components[type]

        instrumentModuleElements.push(
          <ComponentType
            id={id}
            name={name}
            node={node}
            settings={settings}
            handlePropertyValueChange={handlePropertyValueChange}
            key={i}
          />
        )
      })

      instrumentElements.push(
        <div className="Row" key={i}>
          {instrumentModuleElements}
        </div>
      )
    })

    return (
      <div className="SynthRoom">
      <div>
        <p className="Title">Synth of nature</p>
      </div>
        {instrumentElements}
      </div>
    )
  }
}
SynthRoom.propTypes = {
  instruments: PropTypes.array.isRequired,
  handlePropertyValueChange: PropTypes.func.isRequired
}
