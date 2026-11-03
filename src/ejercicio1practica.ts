enum TransactionType {
    DEPOSITO,
    RETIRO
}

class Transaction {
    id: number;
    type: TransactionType;
    amount: number;
    date: string;

    constructor(id: number, type: TransactionType, amount: number, date: string) {
        this.id = id;
        this.type = type;
        this.amount = amount;
        this.date = date
    } 
}

const transactions : Transaction[] = [
    { id: 1, type: TransactionType.DEPOSITO, amount: 250.00, date: "2024-05-01"},
    { id: 2, type: TransactionType.RETIRO, amount: 75.50, date: "2024-05-02"},
    { id: 3, type: TransactionType.DEPOSITO, amount: 150.00, date: "2024-05-03"},
    { id: 4, type: TransactionType.RETIRO, amount: 120.00, date: "2024-05-04"},
    { id: 5, type: TransactionType.RETIRO, amount: 50.25, date: "2024-05-05"},
    { id: 6, type: TransactionType.DEPOSITO, amount: 300.00, date: "2024-05-06"},
    { id: 7, type: TransactionType.RETIRO, amount: 200.00, date: "2024-05-07"},
    { id: 8, type: TransactionType.RETIRO, amount: 99.99, date: "2024-05-08"},
]

// depósito con cargo del 1.5% y suma de los montos de todas las transacciones donde monto >= 100 con cargo aplicado
// coloca el const aditional como error dentro del return a menos que sea en el map antes del return
const bigTransactions = transactions
    .filter((transaction: Transaction) => transaction.type === TransactionType.DEPOSITO)
    .map((transaction: Transaction) => {
        const aditional : number = transaction.amount * 0.015;
        return {
            ...transaction,
            amount : transaction.amount + aditional,
            aditional
        };
    })
    .reduce((acum: number, transaction: Transaction, index: number, array: Transaction[]) => {
        if ((transaction.amount >= 100)) {
            return acum + transaction.amount;
        }
        return acum;
    }, 0);


const avgTransactionsDiscount = transactions
    .filter((transaction: Transaction) => transaction.type === TransactionType.RETIRO)
        .map((transaction: Transaction) => {
            const discount : number = transaction.amount * 0.005;
            return {
                ...transaction,
                amount : transaction.amount - discount,
                discount
            };
        })
        .filter((transactionRetiro) => transactionRetiro.discount >= 0.5)
        .reduce((acum: number, transaction: Transaction, index: number, array: Transaction[]) => {
            if ((index === array.length - 1)) {
                return (acum + transaction.amount)/array.length;
            }
            return acum + transaction.amount;
        }, 0);
//FORMA1
const retiros = transactions
    .filter((transaction: Transaction) => (transaction.date >= "2024-05-05" && transaction.type === TransactionType.RETIRO))
    .map((transaction: Transaction) => ({
        amount: transaction.amount,
        date: transaction.date
    }));
const depositos = transactions
    .filter((transaction: Transaction) => (transaction.date <= "2024-05-04" && transaction.type === TransactionType.DEPOSITO))
    .map((transaction: Transaction) => ({
        amount: transaction.amount,
        date: transaction.date
    }));

const transactionsSinceDate = {
    retiros,
    depositos
};
//FORMA2
const transactionObj = transactions
    .map((transaction) => {
            return {
                ...transaction,
                date: new Date(transaction.date)
            }
        })  
    .reduce((obj: any, transaction) => {
        if (transaction.type === TransactionType.DEPOSITO && transaction.date >= new Date("2024-05-05"))
            obj.deposit.push({
                amount: transaction.amount,
                date: transaction.date
            })
        else if (transaction.type === TransactionType.RETIRO && transaction.date <= new Date("2024-05-05"))
            obj.retire.push({
                amount: transaction.amount,
                date: transaction.date
            })
        return obj
    }, {
        deposit: [],
        retire: []
    })

console.log(`Suma de los montos de todas las transacciones donde monto >= 100 con cargo aplicado: ${bigTransactions}`);
console.log(`Promedio de los montos de todas las transacciones donde descuento = 0.5: ${avgTransactionsDiscount}`);
console.log(transactionObj);