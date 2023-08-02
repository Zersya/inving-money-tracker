import {createClient} from "@supabase/supabase-js";
import {toast, ToastOptions} from "vue3-toastify";
import {navigateTo, useCookie} from "#app";

/// https://github.com/prisma/studio/issues/614#issuecomment-1374116622
declare global {
    interface BigInt {
        toJSON(): string;
    }
}

BigInt.prototype.toJSON = function (): string {
    return this.toString();
};

export function capitalizeFirstLetter(str: string | null | undefined): string {
    if (str === null || str === undefined) return ''
    return str.charAt(0).toUpperCase() + str.slice(1);
}


export const currencyIDRFormatter = Intl.NumberFormat('ID', {
    style:'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
})

export const supabase = createClient('https://xoixclvjgysqxybilnfk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhvaXhjbHZqZ3lzcXh5YmlsbmZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAyOTc1ODUsImV4cCI6MjAwNTg3MzU4NX0.7gRNtgPyHUmPY16Ds0OxWLYsG3owwplJEXb3nlLc48Y')

export async function onSignOut() {
    localStorage.clear()

    await supabase.auth.signOut()

    useCookie('user-id').value = undefined
    useCookie('selected-circle').value = undefined

    return navigateTo('/login')
}
