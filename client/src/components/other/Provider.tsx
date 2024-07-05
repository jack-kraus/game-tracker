"use client"

import { ReactNode, useState } from "react";
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import React from "react";

export default function QueryProvider({ children } : { children : ReactNode }) {
    const [client] = useState(new QueryClient());
    return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}