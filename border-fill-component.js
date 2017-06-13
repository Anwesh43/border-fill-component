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
            this.points = []
            BorderIdentifyingUtil.getBorder(context,this.points,w,h)
            console.log(this.points)
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
class BorderIdentifyingUtil {
    static getBorder(context,points,w,h) {
        const imgData = context.getImageData(0,0,w,h)
        const data = imgData.data
        console.log(data.length)
        var opaquePoints = 0
        for(var i=0;i<data.length;i+=4) {
            const alpha = data[i+3]
            const j = i/4
            const x = j%w,y = Math.floor(i/w)
            if(alpha == 0) {
                //console.log(0)
                opaquePoints++
                continue
            }

            for(var a = -1;a<=1;a++) {
                for(var b = -1;b<=1;b++) {
                    const newX = x+b,newY = y+a
                    if(newX>=0 && newX<w && newX >=0 && newY<h) {
                        const n_index = (newY*w + newX)*4
                        const n_a = data[n_index+3]
                        if(n_a == 0) {
                            points.push({x,y})
                            break
                        }
                    }
                }
            }
        }
    }
}
customElements.define('border-fill',BorderFillComponent)
