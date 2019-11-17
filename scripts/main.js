let menu = JSON.parse(
    '[{"type":"radio","id":0,"name":"size","text":"Маленький","price":50,"energy":20},' +
    '{"type":"radio","id":1,"name":"size","text":"Большой","price":100,"energy":40},' +
    '{"type":"radio","id":2,"name":"entry","text":"с сыром","price":10,"energy":20},'+
    '{"type":"radio","id":3,"name":"entry","text":"с салатом","price":20,"energy":5},'+
    '{"type":"radio","id":4,"name":"entry","text":"с картофелем","price":15,"energy":10},'+
    '{"type":"checkbox","id":5,"name":"addon","text":"посыпать приправой","price":15,"energy":0},'+
    '{"type":"checkbox","id":6,"name":"addon","text":"полить майонезом","price":20,"energy":5}]')

class Hamburger {
    size = -1
    entry = -1
    addon = []
    sumPrice = -1
    sumEnergy = -1

    constructor(menu) {
        this.menu = menu
        this.renderToppings()
    }

    createEl(el) {
        let p = document.createElement('p')
        let inpt = document.createElement('input')
    
        inpt.setAttribute('name', el.name)
        inpt.setAttribute('type', el.type)
        inpt.dataset['id'] = el.id
        inpt.dataset['price'] = el.price
        inpt.dataset['energy'] = el.energy
        
        p.appendChild(inpt)
        p.appendChild(document.createTextNode(' ' + el.text + ' ' + '(+' + el.price + ' рублей, ' + '+' + el.energy + ' калорий)'))
        return p
    }

    // Рендеринг меню
    renderToppings() {
        let block = document.querySelector('.product-item')
        block.addEventListener('change', (evt) => { this.changeHamburger(evt) })

        block.appendChild(document.createTextNode('Выберите размер!'))
        block.appendChild(this.createEl(this.menu[0]))
        block.appendChild(this.createEl(this.menu[1]))
        block.innerHTML += '<hr>'

        block.appendChild(document.createTextNode('Выберите начинку!'))
        block.appendChild(this.createEl(this.menu[2]))
        block.appendChild(this.createEl(this.menu[3]))
        block.appendChild(this.createEl(this.menu[4]))
        block.innerHTML += '<hr>'

        block.appendChild(document.createTextNode('Выберите добавку!'))
        block.appendChild(this.createEl(this.menu[5]))
        block.appendChild(this.createEl(this.menu[6]))
        block.innerHTML += '<div class="order"></div>'
    }

    changeHamburger(evt) {
        let id = evt.target.dataset['id']

        switch (evt.target.name) {
            case 'size':
                this.setSize(id)
                break
            case 'entry':
                this.setStuffing(id)
                break
            case 'addon':
                if (evt.target.checked) {
                    this.addTopping(id)
                } else {
                    this.removeTopping(id)
                }
                break
        }

        this.setOrder()
    }

    // Положить добавку
    addTopping(id) {
        if (this.addon.indexOf(id) == -1) {
            this.addon.push(id)
        }
    }

    // Убрать добавку
    removeTopping(id) {
        if (this.addon.indexOf(id) != -1) {
            this.addon.splice(this.addon.indexOf(id), 1)
        }
    }

    // Записать размер бургера
    setSize(id) {
        this.size = id
    }

    // Записать начинку бургера
    setStuffing(id) {
        this.entry = id
    }

    // Посчитать цену
    calculatePrice() {
        this.sumPrice = 0

        // Расчёт стоимости по размеру
        if (this.size != -1) {
            this.sumPrice += this.menu[this.size].price
        }

        // Расчёт стоимости начинки
        if (this.entry != -1) {
            this.sumPrice += this.menu[this.entry].price
        }

        // Расчёт стоимости добавок
        this.addon.forEach( id => {
            this.sumPrice += this.menu[id].price
        } );
    }

    // Посчитать калорийность
    calculateCalories() {
        this.sumEnergy = 0

        if (this.size != -1) {
            this.sumEnergy += this.menu[this.size].energy
        }

        if (this.entry != -1) {
            this.sumEnergy += this.menu[this.entry].energy
        }

        this.addon.forEach( id => {
            this.sumEnergy += this.menu[id].energy
        } );
    }

    // Оформить заказ
    setOrder() {
        document.querySelector('.order').innerHTML = ''

        this.calculatePrice()
        this.calculateCalories()
        
        let addons = ''
        this.addon.forEach( id => {
            addons += ', '
            addons += this.menu[id].text
        } );

        if (this.size != -1 && this.entry != -1) {
            document.querySelector('.order').appendChild(document.createTextNode(this.menu[this.size].text + ' бургер ' + this.menu[this.entry].text + '' + addons + ' (' + 'цена ' + this.sumPrice + ' рублей, ' + this.sumEnergy + ' калорий)'))
        }

    }
}

let Hamb = new Hamburger (menu)