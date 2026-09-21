"use client"

import { Component } from "react";

export class ErrorBoundary extends Component{
    constructor(props) {
        super(props)

        this.state = {hasError: false, error: null}
    }

    static getDerivedStateFromError(error){
        return {hasError: true, error}
    }

    componentDidCatch(error, errorInfo) {
        console.error("Error caught by error boundary: ", error, errorInfo)
    }

    render(){
        if(this.state.hasError) {
            return(
                <div className="p-6 text-center text-red-600">
                    <h2 className="text-xl font-bold mb-2"> Something went wrong</h2>
                    <p>{this.state?.error?.message || "Unknown error"}</p>

                </div>
            )
        }

        return this.props.children
    }


}