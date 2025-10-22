
import {Mode} from "../mode/Mode.jsx"
import headerStyles from './header.module.css'

export function Header(){

    return <header className={headerStyles.header}>
        <Mode></Mode>
    </header>
}