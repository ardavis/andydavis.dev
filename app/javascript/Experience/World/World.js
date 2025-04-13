import Experience from 'Experience'
import Environment from 'World/Environment'
import Wall from "World/Wall"
import StandingDesk from 'World/StandingDesk'
// import Floor from './Floor'

export default class World {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources

    this.resources.on('ready', () => {
      // Setup
      this.wall = new Wall()
      this.standingDesk = new StandingDesk()
      this.environment = new Environment()
    })
  }
}