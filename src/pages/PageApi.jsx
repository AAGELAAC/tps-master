import { useEffect, useMemo, useState } from 'react'

const API_URL =
    'https://api.open-meteo.com/v1/forecast?latitude=-24.7883&longitude=-65.4106&current_weather=true&hourly=relativehumidity_2m,apparent_temperature,precipitation_probability&daily=sunrise,sunset&timezone=America%2FArgentina%2FSalta'

const createIcon = (svg) => `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`

const icons = {
    sun: createIcon(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="14" fill="#facc15"/><g stroke="#facc15" stroke-width="4" stroke-linecap="round"><line x1="32" y1="6" x2="32" y2="0"/><line x1="32" y1="64" x2="32" y2="58"/><line x1="6" y1="32" x2="0" y2="32"/><line x1="64" y1="32" x2="58" y2="32"/><line x1="11" y1="11" x2="6" y2="6"/><line x1="53" y1="53" x2="58" y2="58"/><line x1="11" y1="53" x2="6" y2="58"/><line x1="53" y1="11" x2="58" y2="6"/></g></svg>'
    ),
    cloudSun: createIcon(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="22" cy="22" r="12" fill="#facc15"/><path d="M22 10v-8M22 52v-8M10 22H2M42 22h8M10.9 11.1l-5.7-5.7M38.3 38.3l5.7 5.7M10.9 32.9l-5.7 5.7M38.3 5.7l5.7-5.7" stroke="#facc15" stroke-width="3" stroke-linecap="round"/><path d="M24 32a14 14 0 0 1 26 8H24a10 10 0 0 1 0-20 11 11 0 0 1 2 .2A12 12 0 0 0 24 32Z" fill="#e2e8f0"/></svg>'
    ),
    cloud: createIcon(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M46 46H18a12 12 0 1 1 3.6-23.5A14 14 0 0 1 46 24a10 10 0 0 1 0 20Z" fill="#cbd5f5"/></svg>'
    ),
    rain: createIcon(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M46 38H18a12 12 0 1 1 3.6-23.5A14 14 0 0 1 46 16a10 10 0 0 1 0 20Z" fill="#bfdbfe"/><g stroke="#3b82f6" stroke-width="4" stroke-linecap="round"><line x1="22" y1="46" x2="18" y2="58"/><line x1="32" y1="46" x2="28" y2="62"/><line x1="42" y1="46" x2="38" y2="58"/></g></svg>'
    ),
    snow: createIcon(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M46 38H18a12 12 0 1 1 3.6-23.5A14 14 0 0 1 46 16a10 10 0 0 1 0 20Z" fill="#e0f2fe"/><g stroke="#38bdf8" stroke-width="4" stroke-linecap="round"><line x1="22" y1="46" x2="22" y2="58"/><line x1="18" y1="50" x2="26" y2="54"/><line x1="26" y1="50" x2="18" y2="54"/><line x1="42" y1="46" x2="42" y2="58"/><line x1="38" y1="50" x2="46" y2="54"/><line x1="46" y1="50" x2="38" y2="54"/></g></svg>'
    ),
    storm: createIcon(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M46 36H18a12 12 0 1 1 3.6-23.5A14 14 0 0 1 46 14a10 10 0 0 1 0 20Z" fill="#cbd5f5"/><polygon points="28 38 18 54 30 54 26 64 46 44 34 44 38 38" fill="#facc15" stroke="#eab308" stroke-width="2" stroke-linejoin="round"/></svg>'
    ),
}

const weatherCodeGroups = [
    { codes: [0], label: 'Cielo despejado', icon: icons.sun },
    { codes: [1, 2], label: 'Parcialmente nublado', icon: icons.cloudSun },
    { codes: [3, 45, 48], label: 'Nublado o neblinoso', icon: icons.cloud },
    {
        codes: [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82],
        label: 'Lluvias o lloviznas',
        icon: icons.rain,
    },
    { codes: [71, 73, 75, 77, 85, 86], label: 'Nieve', icon: icons.snow },
    { codes: [95, 96, 99], label: 'Tormentas', icon: icons.storm },
]

const findWeatherDescriptor = (code) => {
    return weatherCodeGroups.find((group) => group.codes.includes(code)) ?? {
        label: 'Condición no especificada',
        icon: icons.cloud,
    }
}

const formatTime = (dateString, options) => {
    if (!dateString) return '—'
    const date = new Date(dateString)
    if (Number.isNaN(date.getTime())) return '—'
    return date.toLocaleString('es-AR', options)
}

export default function PageApi() {
    const [weather, setWeather] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const controller = new AbortController()

        const loadWeather = async () => {
            try {
                const response = await fetch(API_URL, { signal: controller.signal })
                if (!response.ok) {
                    throw new Error('No se pudo obtener el pronóstico. Intentalo más tarde.')
                }

                const data = await response.json()
                const currentTime = data.current_weather?.time
                const indexForCurrentHour = data.hourly?.time?.findIndex((time) => time === currentTime)

                const safeIndex = indexForCurrentHour !== undefined && indexForCurrentHour >= 0 ? indexForCurrentHour : 0

                setWeather({
                    location: 'Salta Capital, Argentina',
                    updatedAt: currentTime,
                    temperature: data.current_weather?.temperature ?? null,
                    weatherCode: data.current_weather?.weathercode ?? null,
                    windSpeed: data.current_weather?.windspeed ?? null,
                    apparentTemperature: data.hourly?.apparent_temperature?.[safeIndex] ?? null,
                    humidity: data.hourly?.relativehumidity_2m?.[safeIndex] ?? null,
                    precipitationProbability: data.hourly?.precipitation_probability?.[safeIndex] ?? null,
                    sunrise: data.daily?.sunrise?.[0] ?? null,
                    sunset: data.daily?.sunset?.[0] ?? null,
                })
                setError('')
            } catch (err) {
                if (err.name !== 'AbortError') {
                    setError(err.message || 'Ocurrió un error inesperado al consultar la API.')
                }
            } finally {
                setLoading(false)
            }
        }

        loadWeather()

        return () => controller.abort()
    }, [])

    const descriptor = useMemo(
        () => (weather?.weatherCode != null ? findWeatherDescriptor(weather.weatherCode) : null),
        [weather?.weatherCode]
    )

    return (
        <section className="grid gap-6 max-w-4xl mx-auto p-4">
            <div className="space-y-1">
                <h1 className="text-2xl font-light text-white">Clima en tiempo real</h1>
                <p className="text-sm text-gray-400">
                    Información meteorológica actualizada automáticamente para nuestros huéspedes.
                </p>
            </div>

            {loading && <p className="text-gray-300">Consultando la API de Open-Meteo…</p>}

            {!loading && error && (
                <div className="border border-red-900 bg-red-950 text-red-300 p-4">
                    <p>{error}</p>
                </div>
            )}

            {!loading && !error && weather && (
                <article className="grid gap-6 border border-gray-700 bg-gray-800 p-6">
                    <header className="flex gap-6 items-center flex-wrap">
                        {descriptor?.icon && (
                            <img
                                src={descriptor.icon}
                                alt={descriptor.label}
                                width={80}
                                height={80}
                                className="flex-shrink-0"
                            />
                        )}
                        <div className="space-y-1">
                            <h2 className="text-xl font-medium text-white">{weather.location}</h2>
                            <p className="text-4xl font-light text-white">
                                {weather.temperature != null ? `${weather.temperature.toFixed(1)} °C` : '—'}
                            </p>
                            <p className="text-sm text-gray-400">{descriptor?.label}</p>
                            <p className="text-xs text-gray-500">
                                Última actualización:{' '}
                                <span className="font-medium">{formatTime(weather.updatedAt, { dateStyle: 'medium', timeStyle: 'short' })}</span>
                            </p>
                        </div>
                    </header>

                    <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
                        <WeatherMetric label="Sensación térmica" value={formatMetric(weather.apparentTemperature, '°C')} />
                        <WeatherMetric label="Humedad" value={formatMetric(weather.humidity, '%')} />
                        <WeatherMetric
                            label="Viento"
                            value={weather.windSpeed != null ? `${weather.windSpeed.toFixed(1)} km/h` : '—'}
                        />
                        <WeatherMetric
                            label="Probabilidad de lluvia"
                            value={formatMetric(weather.precipitationProbability, '%')}
                        />
                        <WeatherMetric
                            label="Amanecer"
                            value={formatTime(weather.sunrise, { timeStyle: 'short' })}
                        />
                        <WeatherMetric label="Atardecer" value={formatTime(weather.sunset, { timeStyle: 'short' })} />
                    </div>
                </article>
            )}
        </section>
    )
}

const formatMetric = (value, unit) => {
    if (value == null || Number.isNaN(value)) return '—'
    return `${Number(value).toFixed(0)} ${unit}`
}

function WeatherMetric({ label, value }) {
    return (
        <div className="border border-gray-700 bg-gray-900 p-4 space-y-1">
            <span className="text-xs text-gray-500 uppercase tracking-wide">
                {label}
            </span>
            <strong className="block text-lg text-white">{value}</strong>
        </div>
    )
}