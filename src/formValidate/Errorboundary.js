import React, { Component } from 'react'

export default class ErrorBounary extends React.Component{
    constructor(props){
        super(props);
        this.state={hasError:false,errorInfo: '', error: ''}
    }

    static getDerivedStateFromError(error){
       return{ hasError:true}
    }

    componentDidCatch(error,errorInfo){
       this.setState({ errorInfo });
    }

    render(){
        if(this.state.hasError){
            return <h1>Somthing Went Wrong</h1>
        }
        return this.props.children;
    }
}

