import React, { SyntheticEvent } from 'react'

interface AuthFormState{
    login: string;
    password: string;
}

export class AuthForm extends React.Component<{}, AuthFormState>{
    constructor(props: any){
        super(props);
    
        this.state = {
            login: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleChange(event: React.ChangeEvent<HTMLInputElement>){
        const {name, value} = event.target;
        this.setState({ [name] : value } as Pick<AuthFormState, keyof AuthFormState>);
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
                }
            }
        
            
        }catch(error){
            console.log(JSON.stringify(this.state));
        }


    }
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <label>Login</label>
                <input type='text' value={this.state.login} name='login' onChange={this.handleChange} />
                
                <label>Password</label>
                <input type='text' value={this.state.password} name='password' onChange={this.handleChange} />

                <input type='submit' value='Submit' />
            </form>
            
        )
    }
}

