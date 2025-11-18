import { useState } from 'react'
import {
    Dialog,
    DialogPanel,
    PopoverGroup,
} from '@headlessui/react'
import {
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <header className="bg-gray-900">
            <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">

                <div className="flex lg:flex-1">
                    <h1 className="text-2xl font-bold">Tps</h1>
                </div>

                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="size-6" />
                    </button>
                </div>

                <PopoverGroup className="hidden lg:flex lg:gap-x-12">
                    <Link to="/" className='text-sm/6 font-semibold p-2 text-white hover:bg-white/10 rounded-2xl'>Contacto</Link>
                    <Link to="/File" className='text-sm/6 font-semibold p-2 text-white hover:bg-white/10 rounded-2xl'>File</Link>
                    <Link to="/Servicios" className='text-sm/6 font-semibold p-2 text-white hover:bg-white/10 rounded-2xl'>Servicios</Link>
                    <Link to="/Api" className='text-sm/6 font-semibold p-2 text-white hover:bg-white/10 rounded-2xl'>Api</Link>
                </PopoverGroup>
            </nav>

            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-50" />
                <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10">
                    <div className="flex items-center justify-end">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-400"
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                    </div>

                    <div className="mt-1 flow-root">
                        <div className="space-y-2 py-6">
                            <Link
                                to="/"
                                className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/10"
                            >
                                Contacto
                            </Link>
                            <Link
                                to="/File"
                                className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5"
                            >
                                File
                            </Link>
                            <Link
                                to="/Servicios"
                                className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5"
                            >
                                Servicios
                            </Link>
                            <Link
                                to="/Api"
                                className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5"
                            >
                                Api
                            </Link>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header >
    )
}
