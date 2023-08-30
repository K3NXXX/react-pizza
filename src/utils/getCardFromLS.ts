export const getCardFromLS = () => {
    const data = localStorage.getItem("cart")
    return data ? JSON.parse(data) : []
}