import { Subject, Subscription } from "rxjs";
import { borrowModalSeachFilterSubject } from "../Book/BookItem";
import { ExtendedUser, UserCards } from "./UserCards";



export const userSelectCardsSubject = new Subject<ExtendedUser>()

export class UserSelectCards extends UserCards {
    borrowModalSeachFilterSub: Subscription | null = null
    async componentDidMount(): Promise<void> {
        await this.loadData()
        this.borrowModalSeachFilterSub = borrowModalSeachFilterSubject.subscribe(this.filterData)
    }
    componentWillUnmount(): void {
        super.componentWillUnmount()
        this.borrowModalSeachFilterSub?.unsubscribe()
    }
    handleClick(userKey: number): void {
        const { data } = this.state
        if (data != null && userKey != null) {
            const selectedUser = data.find(el => el.user.key == userKey)
            if (selectedUser != null) {
                console.log("user:", selectedUser)
                userSelectCardsSubject.next(selectedUser)
                console.log(selectedUser)
                this.setState({
                    selectedRecord: selectedUser
                })
            }
        }
    }
}