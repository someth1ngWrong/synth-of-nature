import * as Tone from 'tone'
import { generateUniqId } from '../utilities'



const synthSettings = {
  volume: 0.8,
  detune: 0,
  portamento: 0.1,
  envelope: {
    attack: 0.5,
    attackCurve: 'exponential',
    decay: 0.2,
    decayCurve: 'exponential',
    sustain: 0.72,
    release: 1,
    releaseCurve: 'exponential'
  },

  oscillator: {
    type: 'fatsine',
    modulationType: 'sine',
    // partialCount: 0,
    // partials: [],
    phase: 11,
    harmonicity: 0.5
  }
}



const chorusSettings = {
  wet: 0.22,
  type: 'square',
  frequency: 1.25,
  delayTime: 25,
  depth: 0.88,
  spread: 73
}

const freeverbSettings = {
  wet: 0.16,
  roomSize: 0.2,
  dampening: 528
}

const pingPongDelaySettings = {
  wet: 0.8,
  delayTime: 0.45,
  maxDelayTime: 0.33
}

const channelSettings = {
  volume: -14,
  pan: 0,
  mute: false,
  solo: false
}

const autoFilterSettings = {
  wet: 0.1,
  type: 'triangle',
  frequency: 45.74,
  depth: 0.9,
  baseFrequency: 566,
  octaves: 3.3,
  filter: {
    type: 'highpass',
    frequency: 842,
    rolloff: -96,
    Q: 8.34
  }
}

// const synthNode = new Tone.Synth(synthSettings)
// const freeverbNode = new Tone.Freeverb(freeverbSettings)
// const channelNode = new Tone.Channel(channelSettings).toDestination()
// synthNode.chain(freeverbNode, channelNode)

const synthNode = new Tone.Synth(synthSettings)
const chorusNode = new
Tone.Chorus(chorusSettings).start()
const autoFilterNode = new Tone.AutoFilter(autoFilterSettings).start()
const freeverbNode = new Tone.Freeverb(freeverbSettings)
const pingPongDelayNode = new Tone.PingPongDelay(pingPongDelaySettings)
const channelNode = new Tone.Channel(channelSettings).toDestination()

synthNode.chain(
  autoFilterNode,
  chorusNode,
  freeverbNode,
  pingPongDelayNode,
  channelNode
)

const instrument = [
  {
    id: generateUniqId(),
    name: 'Hang Synth',
    type: 'ToneSynth',
    node: synthNode,
    settings: synthSettings
  },
  {
    id: generateUniqId(),
    name: 'Chorus',
    type: 'ChorusEffect',
    node: chorusNode,
    settings: chorusSettings
  },
  {
    id: generateUniqId(),
    name: 'Channel',
    type: 'Channel',
    node: channelNode,
    settings: channelSettings
  },
  {
    id: generateUniqId(),
    name: 'Freeverb',
    type: 'FreeverbEffect',
    node: freeverbNode,
    settings: freeverbSettings
  },
  {
    id: generateUniqId(),
    name: 'Ping Pong Delay',
    type: 'PingPongDelayEffect',
    node: pingPongDelayNode,
    settings: pingPongDelaySettings
  },
  {
    id: generateUniqId(),
    name: 'Auto Filter',
    type: 'AutoFilterEffect',
    node: autoFilterNode,
    settings: autoFilterSettings
  },
]

const v = 1

const part = new Tone.Part(
  function (time, note) {
    synthNode.triggerAttackRelease(
      note.noteName,
      note.duration,
      time,
      note.velocity
    )
  },
  [
    {
      time: '0:0:0',
      noteName: 'B4',
      duration: '1n',
      velocity: v
    },

    {
      time: '2:0:0',
      noteName: 'G5',
      duration: '4n',
      velocity: v
    },
    {
      time: '2:2:0',
      noteName: 'B5',
      duration: '4n',
      velocity: v
    },
    {
      time: '4:0:0',
      noteName: 'B4',
      duration: '1n',
      velocity: v
    },

    {
      time: '6:0:0',
      noteName: 'G5',
      duration: '4n',
      velocity: v
    },
    {
      time: '6:2:0',
      noteName: 'C5',
      duration: '4n',
      velocity: v
    },
    {
      time: '6:2:0',
      noteName: 'C#5',
      duration: '4n',
      velocity: v
    },



  ]
)

part.loopEnd = '8m'
part.loop = true

export { instrument, part }
