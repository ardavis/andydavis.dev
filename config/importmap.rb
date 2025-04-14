# Pin npm packages by running ./bin/importmap

pin "application"
pin "@hotwired/turbo-rails", to: "turbo.min.js"
pin "@hotwired/stimulus", to: "stimulus.min.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"
pin_all_from "app/javascript/controllers", under: "controllers"
pin "bootstrap", to: "bootstrap.bundle.min.js"
pin "desk", to: "desk.js"
pin "lil-gui" # @0.20.0
pin "three", to: "https://unpkg.com/three@0.164.1/build/three.module.js"
pin "three/addons/loaders/GLTFLoader", to: "https://unpkg.com/three@0.164.1/examples/jsm/loaders/GLTFLoader.js"
pin "three/addons/loaders/RGBELoader", to: "https://unpkg.com/three@0.164.1/examples/jsm/loaders/RGBELoader.js"
pin "three/addons/loaders/FontLoader", to: "https://unpkg.com/three@0.164.1/examples/jsm/loaders/FontLoader.js"
pin "gsap", to: "https://esm.sh/gsap@3.12"
pin_all_from "app/javascript/Experience", to: "Experience"
