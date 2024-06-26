import React from 'react';
import { Link } from 'react-router-dom';
import style from './index.module.css';

export function Header() {
    return (
        <header className={style.header}>
            <img src="imagens/iconedb.png" alt="Icone" width={76} height={34} />
            <nav>
                <Link to="/">CADASTRO</Link>
                <Link to="/listar">LISTAR</Link>
            </nav>
        </header>
    );
}