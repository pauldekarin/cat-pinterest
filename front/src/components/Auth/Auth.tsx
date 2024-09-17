import React, { SyntheticEvent } from 'react'
import styles from './Auth.module.css'
interface AuthFormState{
    login: string;
    password: string;
    authorized: boolean;
}

export class AuthForm extends React.Component<{}, AuthFormState>{
    constructor(props: any){
        super(props);
    
        this.state = {
            login: '',
            password: '',
            authorized: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleChange(event: React.ChangeEvent<HTMLInputElement>){
        const {name, value} = event.target;
        this.setState({ [name] : value, authorized: false } as Pick<AuthFormState, keyof AuthFormState>);
    }

    async handleSubmit(event: SyntheticEvent){
        event.preventDefault();
        try{
            const response = await fetch(`/api/user`,{
                method:'POST',
                headers:{
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(this.state),
            });

            if(response.ok){
                const token: string | null = response.headers.get('x-auth-token');

                if(token){
                    localStorage.setItem('token', token as string);

                    this.setState({
                        login: this.state.login,
                        password: this.state.password,
                        authorized: true
                    })
                }
            }
        
            
        }catch(error){
            console.log(JSON.stringify(this.state));
        }


    }
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <div className={styles["brutalist-container"]}>
                    <input
                        placeholder="..."
                        className={styles["brutalist-input"]}
                        type="text"
                        value={this.state.login} 
                        name="login"
                        onChange={this.handleChange}
                    />
                    <label className={styles['brutalist-label']}>Login</label>
                </div>

                <div className={styles["brutalist-container"]}>
                    <input
                        placeholder="..."
                        className={styles["brutalist-input"]}
                        type="text"
                        value={this.state.password} // Здесь должна быть ваша логика состояния
                        name="password"
                        onChange={this.handleChange}
                    />
                    <label className={styles['brutalist-label']}>Password</label>
                </div>
                <div className={styles['brutalist-container']}>
                    {
                        this.state.authorized ? <span>Теперь ты <b>{this.state.login}</b> !</span> : <></>
                    }

                </div>
                <input
                    className={styles['brutalist-input-submit']}
                    type='submit'
                    value='Sign Up'
                    onClick={this.handleSubmit}
                />

                <div className={styles['brutalist-container']}>
                    <h2>Warning!</h2>
                    <p>
                        Есть только форма регистрации,
                        если повторно зарегистрироваться, то данные[Likes] будут отображаться предудыщего пользователя до следующей перезагрузки сайта.
                        Восстановить доступ к предыдущему пользователю невозможно.
                        <br/>
                        Проект находится на стадии Pre-[Not Soon]Post-Alpha-Development.
                        
                    </p>
                </div>
            </form>
            
        )
    }
}

