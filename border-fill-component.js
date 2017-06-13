class BorderFillComponent extends HTMLElement{
    constructor() {
        super()
        const shadow = this.attachShadow({mode:'open'})
        this.img = document.createElement('img')
        shadow.appendChild(this.img)
        this.src = this.getAttribute('src')
    }
    render() {
        const canvas = document.createElement('canvas')
        const w = this.image.width,h = this.image.height
        canvas.width = w*1.2
        canvas.height = h*1.2
        const context = canvas.getContext('2d')
        context.drawImage(this.image,this.image.width*0.1,this.image.height*0.1)
        if(!this.points && !this.index) {
            this.index = 0
        }
        this.img.src = canvas.toDataURL()
    }
    connectedCallback() {
        this.image = new Image()
        this.image.src = this.src
        this.image.onload = () => {
            this.render()
        }
    }
}
