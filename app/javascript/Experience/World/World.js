import Experience from 'Experience'
import Environment from 'World/Environment'
import Wall from "World/Wall"
import StandingDesk from 'World/StandingDesk'
import Monitor from 'World/Monitor'
import MouseAndKeyboard from 'World/MouseAndKeyboard'
import PictureFrame from 'World/PictureFrame'
import Curtain from 'World/Curtain'
import Window from 'World/Window'

export default class World {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources

    this.resources.on('ready', () => {
      this.environment = new Environment()

      this.wall = new Wall()
      this.desk = new StandingDesk()
      this.monitor = new Monitor()
      this.mouseAndKeyboard = new MouseAndKeyboard()
      this.pictureFrame = new PictureFrame()
      this.curtain = new Curtain()
      // this.window = new Window()
    })
  }

  update() {
    if (this.monitor)
      this.monitor.update()
  }
}