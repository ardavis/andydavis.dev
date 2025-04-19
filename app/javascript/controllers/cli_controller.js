import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="cli"
export default class extends Controller {
  static targets = ["output", "project", "input", "websiteDisplay", "terminalOutput", "iframe"]

  connect() {
    console.log("CLI controller connected")
    this.currentProject = null
  }

  // Clicking on a project
  launch(event) {
    const projectElement = this.currentProject
    const projectName = projectElement.dataset.projectName
    const projctUrl = projectElement.dataset.projectUrl
    const projectDescription = projectElement.dataset.projectDescription

    this.currentProject = { name: projectName, url: projectUrl, description: projectDescription }
    this.executeProject()
  }

  // Handle typing and "executing" commands
  execute(event) {
    if (event.key == "Enter") {
      const command = this.inputTarget.value.trim()
      this.appendOutput(`$ ${command}`)
    }
  }
}
