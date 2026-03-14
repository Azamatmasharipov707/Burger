const product = {
    plainBurger: {
        name: 'GAMBURGER',
        price: 10000,
        kcall: 400,
        amount: 0,
        get calcSum() { //get orqali yaralgan funksiya hechqachon o'zgartirish kiritilmidi 
            return this.price * this.amount
        },
        get calcKcall() {
            return this.kcall * this.amount
        }
    },
    freshBurger: {
        name: 'GAMBURGER FRESH',
        price: 20500,
        kcall: 500,
        amount: 0,
        get calcSum() { //get orqali yaralgan funksiya hechqachon o'zgartirish kiritilmidi 
            return this.price * this.amount
        },
        get calcKcall() {
            return this.kcall * this.amount
        }
    },
    freshCombo: {
        name: 'FRESH COMBO',
        price: 31900,
        kcall: 600,
        amount: 0,
        get calcSum() { //get orqali yaralgan funksiya hechqachon o'zgartirish kiritilmidi 
            return this.price * this.amount
        },
        get calcKcall() {
            return this.kcall * this.amount
        }
    }
}

let btn = document.querySelectorAll('.main__product-btn');

for (let i = 0; i < btn.length; i++) {

    btn[i].addEventListener('click', function () {

        // console.log(this.closest('.main__product').getAttribute('id'))// closest balantga qarap ota onasini topadi
        prepare(this)

    })

}


let num; //oxirida

function prepare(el) {

    let parent = el.closest('.main__product')
    let parentId = parent.getAttribute('id')// bu metodni foydasi id o'zgarsaham ishlidi agar id o'zini olsam o'zgarsa ishlamasdi
    // console.log(parentId)
    num = parent.querySelector('.main__product-num')
    // topiberishsin
    let amount = product[parentId].amount// shu yerini esla
    // console.log(parentId)
    let sym = el.getAttribute('data-symbol')

    let price = parent.querySelector('.main__product-price span')

    let kcall = parent.querySelector('.main__product-kcall span')

    // if (el.getAttribute('data-symbol') == '+') {
    //     num.innerHTML++
    // } else {
    //     num.innerHTML--
    // }

    // if (sym == '+') {
    //     amount++
    //     // num.innerHTML++
    // } else {
    //     amount--
    //     // num.innerHTML--
    // }

    if (sym == '+' && amount < 10) {
        amount++
        // num.innerHTML++
    } else if (sym == '-' && amount > 0) {
        amount--
        // num.innerHTML--
    }

    num.innerHTML = amount

    product[parentId].amount = amount
    price.innerHTML = product[parentId].calcSum // kalitga o'xshapqoladi
    kcall.innerHTML = product[parentId].calcKcall

}



let addCart = document.querySelector('.addCart')
let receipt = document.querySelector('.receipt') // display: flex qilish kerak
let receiptWindow = receipt.querySelector('.receipt__window') // buno top: unset qilishimiz kerak
let receiptWindowOut = receipt.querySelector('.receipt__window-out') // yozishimiz kerak ichiga
let receiptWindowBtn = receipt.querySelector('.receipt__window-btn') // pay kno'pkasi


addCart.addEventListener('click', function () {

    if (num.innerHTML != 0) { // buni oxirida ko'rsataman
        receipt.style.display = 'flex'
        setTimeout(() => {
            receipt.style.opacity = 1
            receiptWindow.style.top = '10%'// '10%'   // overflow, linear g, z-index, d-block
        }, 300)

        let menu = `Your cart: \n\n`
        let totalPrice = 0;
        let totalKcall = 0;
        for (const key in product) {//object ichida amount ko'p bo'lgani uchun yugururipchiqamiz
            // console.log(product[key])
            // console.log(product[key].amount)


            if (product[key].amount) {
                // menu = menu + product[key].name
                menu = menu + `${product[key].name} ${product[key].amount}x\n`
                totalPrice += product[key].calcSum
                totalKcall += product[key].calcKcall
            }

        }

        // receiptWindowOut.innerHTML = menu
        // receiptWindowOut.innerHTML = `${menu}\nTotal price: ${totalPrice} so'm`
        receiptWindowOut.innerHTML = `${menu}\nTotal price: ${totalPrice} so'm\nTotal calories ${totalKcall}`

    }
})

receiptWindowBtn.addEventListener('click', () => {

    // location = 'google.ru'
    location.reload()

})

let productInfo = document.querySelectorAll('.main__product-info')
let view = document.querySelector('.view')

let viewImg = document.querySelector('.view img')
let viewClose = document.querySelector('.view__close')


console.log(view)

productInfo.forEach(element => {
    element.addEventListener('dblclick', () => {
        let img = element.querySelector('.main__product-img')
        let getImg = img.getAttribute('src')
        viewImg.setAttribute('src', `${getImg}`)
        view.style.display = 'flex'
        view.style.justifyContent = 'center'
        view.style.alignItems = 'center'
    })
});

viewClose.addEventListener('click', () => {
    view.style.display = 'none'
})


let timerExtra = document.querySelector('.header__timer-extra')

window.onload = () => {
    function extraTimer() {
        if (timerExtra.innerText < 100) timerExtra.innerText++
        setTimeout(() => {
            extraTimer()
        }, 50)
    }
    extraTimer()
}
