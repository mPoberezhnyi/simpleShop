function allItems() {
    const itemsList = document.getElementsByClassName('product-box__item')

    let newItemList = []

    for (let i = 0; i < itemsList.length; i++) {
        const category = itemsList[i].getAttribute('data-category')
        const _id = `${i}4567${category}`
        itemsList[i].setAttribute('id', _id)
        newItemList = [
            ...newItemList, 
            {
                _id,
                category,
                price: parseInt(itemsList[i].querySelector('.price').innerText)
            }
        ]
    }

    return newItemList
}

function filterItems(items, category, price) {
    if (category == 0 && price === 0) {
        return items.reduce((idList, item) => {
            idList.push(item._id)
            return idList
        }, [])
    }

    if (category == 0) {
        return items.reduce((idList, item) => {
            if (item.price <= price) {
                idList.push(item._id)
            }
            return idList
        }, [])
    }

    if (price === 0) {
        return items.reduce((idList, item) => {
            if (item.category == category) {
                idList.push(item._id)
            }
            return idList
        }, [])
    }

    return items.reduce((idList, item) => {
        if (item.category == category && item.price <= price) {
            idList.push(item._id)
        }
        return idList
    }, [])
}


function showItems(filteredItems) {
    for (item of document.getElementsByClassName('product-box__item')) {
        const itemId = item.getAttribute('id')

        if (filteredItems.includes(itemId)) {
            item.style.display = 'flex'
        }
        else {
            item.style.display = 'none'
        }
    }
}

function setAllSum(param, oldValue, newValue) {
    if (oldValue === 0 || oldValue) {
        param.innerText =  oldValue + newValue
    }
    else {
        param.innerText = newValue
    }
}

window.onload = () => {
    const itemsList = allItems()
    const filter = {
        category: 0,
        price: 0
    }
    const count = document.getElementById('count')
    const sum = document.getElementById('sum')

    // filter items
    for(item of document.getElementsByClassName('select-control')) {
        item.onchange = (e) => {
            filter[e.target.getAttribute('id').toString()] = e.target.value
            showItems(filterItems(itemsList, filter.category, parseInt(filter.price)))
        }
    }

    // set sum
    for(item of document.getElementsByClassName('product-box__btn')) {
        item.onclick = (e) => {
            const parent = e.target.closest('.product-box__item')
            const itemId = parent.getAttribute('id')
            const productCount = parseInt(parent.querySelector('.qty__item').value) || 0
            const price = itemsList.find(item => item._id === itemId) && itemsList.find(item => item._id === itemId).price || 0

            const oldCount = parseInt(count.innerText)
            const oldSum = parseInt(sum.innerText)
            const newSum = productCount * price

            setAllSum(count, oldCount, productCount)
            setAllSum(sum, oldSum, newSum)
        }
    }
}