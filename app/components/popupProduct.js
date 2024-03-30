'use client'
import React, { useEffect, useState } from 'react';
import { getProduct } from '../service/getProduct.js';
import getIngredients from '../service/getIngredients.js';
import getSizes from '../service/getSizes.js';

const HTMLLoading = (
    <img src="/Common/loading.svg" alt="loading" className='card__loading' />
)

const popupProductHash = '#card'

export default function popupProduct() {
    const [isLoading, setLoading] = useState(true)
    const [product, setProduct] = useState(undefined)
    const [ingredients, setIngredients] = useState([])
    const [avalibleSizes, setAvalibleSizes] = useState([])
    const [curentSize, setCurentSize] = useState({})
    let content;
    let uniqueDivKey = 0
    let uniqueLabelKey = 0
    async function click1(e) {
        if (e.detail.popup.hash == popupProductHash) {

            let filters = window.location.search
            const params = new URLSearchParams(filters)
            if (document.querySelector('#card').dataset.productId != params.get(process.env.NEXT_PUBLIC_ID_FOR_PRODUCT)) {
                setLoading(true)
                const id = params.get(process.env.NEXT_PUBLIC_ID_FOR_PRODUCT)
                let productRespons = await getProduct(id)
                setProduct(productRespons[0])
                if (productRespons.length > 1) {
                    alert('ОШИБКА ПРИ ПОЛУЧЕНИИ ДАННЫХ О ПРОДУКТЕ!')
                }
                let Ingredients = await getIngredients(id)
                setIngredients(Ingredients)
                let sizesRespons = await getSizes(id)
                setAvalibleSizes(sizesRespons)
                setCurentSize(sizesRespons[0])
                setLoading(false)
            }
        }
    }
    function changeSize(e) {
        let newCurentSize = avalibleSizes.find((elem) => { return elem.size_cm == e.target.value })
        setCurentSize(newCurentSize)
        // let newCurentSize = setAvalibleSizes.find()
    }
    useEffect(() => {
        console.log('продукты отрендерены')
        document.addEventListener('beforePopupOpen', click1);

        return () => {
            document.removeEventListener('beforePopupOpen', click1);
        };
    }, []);
    if (isLoading) {
        content = HTMLLoading
    } else {
        content =
            (<>
                <div className="card__img">
                    <div className="card__img-inner"><img src={product.image_url.slice(3)} alt="pizza" /></div>
                </div>
                <form action="" method="post" className="card__info">
                    <div className="card__info-wrapper">
                        <div className="card__phantom-img">
                            <div> </div>
                        </div>
                        <div className="card__info-blur">
                            <div className="card__info-block">
                                <h2 className="card__title-product">
                                    {/* <img src="/Common/Fire.svg" alt="Fire" /> */}
                                    <span>{product.p_name}</span>

                                </h2>
                                <div className="card__ingridients">
                                    {ingredients.map(({ i_type, i_name }) => {
                                        uniqueDivKey++
                                        return (
                                            <div key={uniqueDivKey} className="card__ingridient ingridient">
                                                <div className="ingridient__img">
                                                    <div className="ingridient__img-inner"><img src={`/ingredients/${i_type}.png`} alt={i_type} /></div>
                                                </div>
                                                <div className="ingridient__text">{i_name}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="card__info-block">
                                <div className="card__block-buttons">
                                    <label className="card__option">
                                        <input type="radio" defaultChecked name="test1" style={{ display: 'none' }} /><span id="word_opts">Традиционное</span>
                                    </label>
                                    <label className="card__option">
                                        <input type="radio" name="test1" style={{ display: 'none' }} /><span id="word_opts">Тонкое</span>
                                    </label>
                                </div>
                                <div className="card__block-buttons">
                                    {
                                        avalibleSizes.map(size => {
                                            uniqueLabelKey++
                                            return (
                                                <label key={uniqueLabelKey} className="card__option">
                                                    <input onClick={changeSize} type="radio" defaultChecked={size.size_cm == curentSize.size_cm ? true : false} name="size" value={size.size_cm} style={{ display: 'none' }} /><span id="word_opts">{`${size.size_cm} см`}</span>
                                                </label>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            {/* <div className="card__info-block">--------------------------------------------------блок на будующее-----------------------------
                                <h3 className="card__title-second">Добавьте в пиццу</h3>
                                <div className="card__ingridients">
                                    <label className="card__option card__ingridient ingridient ingridient_not-worked">
                                        <input type="checkbox" name="test1" style={{ display: 'none' }} />
                                        <div className="ingridient__img">
                                            <div className="ingridient__img-inner"><img src="@img/Common/cheese.svg" alt="cheese" /></div>
                                        </div>
                                        <div className="ingridient__text">Моцарелла</div>
                                        <div className="ingridient__price">59<span> ₴</span></div>
                                    </label>
                                    <label className="card__option card__ingridient ingridient">
                                        <input type="checkbox" name="test1" style={{ display: 'none' }} />
                                        <div className="ingridient__img">
                                            <div className="ingridient__img-inner"><img src="@img/Common/cheese.svg" alt="cheese" /></div>
                                        </div>
                                        <div className="ingridient__text">Моцарелла</div>
                                        <div className="ingridient__price">59<span> ₴</span></div>
                                    </label>
                                    <label className="card__option card__ingridient ingridient">
                                        <input type="checkbox" name="test1" style={{ display: 'none' }} />
                                        <div className="ingridient__img">
                                            <div className="ingridient__img-inner"><img src="@img/Common/cheese.svg" alt="cheese" /></div>
                                        </div>
                                        <div className="ingridient__text">Моцарелла</div>
                                        <div className="ingridient__price">59<span> ₴</span></div>
                                    </label>
                                    <label className="card__option card__ingridient ingridient">
                                        <input type="checkbox" name="test1" style={{ display: 'none' }} />
                                        <div className="ingridient__img">
                                            <div className="ingridient__img-inner"><img src="@img/Common/cheese.svg" alt="cheese" /></div>
                                        </div>
                                        <div className="ingridient__text">Моцарелла</div>
                                        <div className="ingridient__price">59<span> ₴</span></div>
                                    </label>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <div className="card__info-send send">
                        <div className="send__info">
                            <div className="send__price">Итого: <span id="send__price">{curentSize.price}</span><span> ₴</span></div>
                            <div className="send__weight">{curentSize.weight_g} <span> г</span></div>
                        </div>
                        <button type="submit" className="send__submit">Добавить</button>
                    </div>
                </form>
            </>)
    }
    return (
        <div data-product-id={product ? product.product_id : 'loading'} id="card" aria-hidden="true" className="popup card">
            <div className="popup__wrapper card__wrapper">
                <div className="popup__content card__content">
                    <button data-close="data-close" type="button" className="popup__close card__close"><img src="/Common/CrossWhite.svg" alt="Cross" /></button>
                    <div className="card__body">
                        {content}
                    </div>
                </div>
            </div>
        </div>
    )
}