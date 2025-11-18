const rooms = [
    {
        id: 1,
        name: 'Estudio Moderno',
        description: 'Espacio compacto y funcional con diseño contemporáneo.',
        capacity: '2 personas',
        price: '$95/noche',
        image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 2,
        name: 'Loft Urbano',
        description: 'Concepto abierto con techos altos y luz natural.',
        capacity: '3 personas',
        price: '$140/noche',
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 3,
        name: 'Suite Zen',
        description: 'Ambiente minimalista diseñado para el descanso absoluto.',
        capacity: '2 personas',
        price: '$165/noche',
        image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80'
    }
]

export default function PageServicios() {
    return (
        <section className="flex flex-col items-center min-h-screen p-8">
            <div className="w-full max-w-5xl">
                <header className="text-center mb-12">
                    <h1 className="text-3xl font-light text-white mb-2">Habitaciones</h1>
                    <p className="text-gray-400 text-sm">
                        Espacios diseñados para tu comodidad
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rooms.map((room) => (
                        <article key={room.id} className="bg-gray-800 border border-gray-700 overflow-hidden">
                            <img
                                src={room.image}
                                alt={room.name}
                                className="w-full h-48 object-cover"
                                loading="lazy"
                            />
                            <div className="p-5 space-y-2">
                                <h2 className="text-lg font-medium text-white">{room.name}</h2>
                                <p className="text-sm text-gray-400 leading-relaxed">{room.description}</p>
                                <p className="text-xs text-gray-500">{room.capacity}</p>
                                <p className="text-base font-semibold text-white pt-1">{room.price}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}