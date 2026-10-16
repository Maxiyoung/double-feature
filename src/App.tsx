import { useState, useEffect, useRef } from 'react';
import {
  Ticket,
  Search,
  Sparkles,
  Download,
  Clock,
  Quote,
  Palette,
  MapPin,
  Film,
  ArrowRight,
  Loader2,
  AlertCircle,
  RefreshCw,
  Compass,
  History,
} from 'lucide-react';
import {
  TICKET_THEMES,
  CURATED_PROGRAMS,
  CURATORIAL_LENSES,
  type CuratorialLens,
  type DoubleFeatureProgram,
  type TicketTheme,
} from './data/programs';
import {
  searchMoviesOnline,
  generateDoubleFeature,
  type SearchMovieResult,
} from './utils/curatorEngine';
import { drawCinemaTicket } from './utils/ticketPrinter';
import { computeSchedule } from './utils/schedule';

function getErrorMessage(err: unknown, fallback: string): string {
  return err instanceof Error && err.message ? err.message : fallback;
}

export default function App() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchMovieResult[]>([]);
  const [currentMovieSource, setCurrentMovieSource] = useState<SearchMovieResult>({
    id: 'preset-sorpasso',
    title: 'Il Sorpasso',
    castInfo: 'Vittorio Gassman, Jean-Louis Trintignant',
    year: 1962,
  });

  const [selectedLens, setSelectedLens] = useState<CuratorialLens>('THEMATIC_MIRROR');
  const [excludedTitles, setExcludedTitles] = useState<string[]>([
    "C'eravamo tanto amati",
  ]);
  const [historyPrograms, setHistoryPrograms] = useState<DoubleFeatureProgram[]>(
    CURATED_PROGRAMS
  );

  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isCurating, setIsCurating] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fontsReady, setFontsReady] = useState<boolean>(false);

  const [selectedProgram, setSelectedProgram] = useState<DoubleFeatureProgram>(
    CURATED_PROGRAMS[0]
  );
  const [ticketTheme, setTicketTheme] = useState<TicketTheme>(TICKET_THEMES[0]);
  const [cinemaName, setCinemaName] = useState<string>('Cineclub Lumière · Sala 1');
  const [screeningDate, setScreeningDate] = useState<string>('Viernes');
  const [startTime, setStartTime] = useState<string>('20:00');
  const [seatCode, setSeatCode] = useState<string>('FILA G · BUTACA 14');
  const [serialNumber, setSerialNumber] = useState<string>('00482-A');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const schedule = computeSchedule(
    startTime,
    selectedProgram.filmA.durationMin,
    selectedProgram.filmB.durationMin
  );

  useEffect(() => {
    let cancelled = false;
    Promise.allSettled([
      document.fonts.load('700 36px "Cormorant Garamond"'),
      document.fonts.load('italic 600 22px "Cormorant Garamond"'),
      document.fonts.load('italic 400 14px "Cormorant Garamond"'),
      document.fonts.load('400 12px "Space Mono"'),
      document.fonts.load('700 12px "Space Mono"'),
    ]).then(() => {
      if (!cancelled) setFontsReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current || isCurating || !fontsReady) return;
    drawCinemaTicket(canvasRef.current, selectedProgram, {
      cinemaName,
      screeningDate,
      startTime,
      seatCode,
      serialNumber,
      theme: ticketTheme,
    });
  }, [
    selectedProgram,
    cinemaName,
    screeningDate,
    startTime,
    seatCode,
    serialNumber,
    ticketTheme,
    isCurating,
    fontsReady,
  ]);

  const addToHistory = (prog: DoubleFeatureProgram) => {
    setHistoryPrograms((prev) => {
      const filtered = prev.filter(
        (item) =>
          !(
            item.filmA.title === prog.filmA.title &&
            item.filmB.title === prog.filmB.title
          )
      );
      return [prog, ...filtered].slice(0, 8);
    });
  };

  const handleSelectMovieForDoubleFeature = async (
    movie: SearchMovieResult,
    lensOverride?: CuratorialLens
  ) => {
    const activeLens = lensOverride || selectedLens;
    setCurrentMovieSource(movie);
    setIsCurating(true);
    setErrorMsg(null);
    try {
      const newProgram = await generateDoubleFeature(movie, {
        lens: activeLens,
      });
      setSelectedProgram(newProgram);
      setExcludedTitles([newProgram.filmB.title]);
      addToHistory(newProgram);
      setSerialNumber(
        `${String(Math.floor(1000 + Math.random() * 9000)).padStart(5, '0')}-B`
      );
    } catch (err: unknown) {
      setErrorMsg(getErrorMessage(err, 'Ocurrió un error al generar la función doble.'));
    } finally {
      setIsCurating(false);
    }
  };

  const handleAnotherPairing = async () => {
    setIsCurating(true);
    setErrorMsg(null);
    try {
      const nextProgram = await generateDoubleFeature(currentMovieSource, {
        lens: selectedLens,
        excludedTitles,
        forceRefresh: true,
      });
      setSelectedProgram(nextProgram);
      setExcludedTitles((prev) => [...prev, nextProgram.filmB.title]);
      addToHistory(nextProgram);
      setSerialNumber(
        `${String(Math.floor(1000 + Math.random() * 9000)).padStart(5, '0')}-C`
      );
    } catch (err: unknown) {
      setErrorMsg(
        getErrorMessage(err, 'No se pudo generar otra función en este momento.')
      );
    } finally {
      setIsCurating(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanQuery = searchQuery.trim();
    if (!cleanQuery) return;
    setIsSearching(true);
    setErrorMsg(null);

    try {
      const results = await searchMoviesOnline(cleanQuery);
      setSearchResults(results);
      if (results.length === 0) {
        setErrorMsg('No se encontraron largometrajes con ese título en IMDb.');
        return;
      }

      const exactMatch = results.find(
        (r) => r.title.toLowerCase() === cleanQuery.toLowerCase()
      );
      if (results.length === 1 || exactMatch) {
        await handleSelectMovieForDoubleFeature(exactMatch || results[0]);
      }
    } catch (err: unknown) {
      setErrorMsg(getErrorMessage(err, 'Error al buscar la película.'));
    } finally {
      setIsSearching(false);
    }
  };

  const handleDownloadTicket = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = `funcion-doble-${selectedProgram.filmA.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')}.png`;
    link.href = canvasRef.current.toDataURL('image/png', 1.0);
    link.click();
  };

  return (
    <div className="min-h-screen bg-[#0C0A09] text-stone-100 flex flex-col">
      <header className="border-b border-stone-800/80 bg-[#0C0A09]/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-950/70 border border-red-800/60 flex items-center justify-center text-amber-300">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-serif-cinema font-bold tracking-wide flex items-center gap-2">
                Double Feature
                <span className="text-[10px] font-mono-ticket uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  AI Filmoteca Curator
                </span>
              </h1>
              <p className="text-xs text-stone-400 hidden sm:block">
                Buscá cualquier película y el programador arma la segunda función ideal en tiempo real
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleDownloadTicket}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-400 hover:bg-amber-300 text-stone-950 shadow-lg shadow-amber-500/15 flex items-center gap-2 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Imprimir Boleto PNG (2x HD)</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto w-full px-4 py-6 flex-grow grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 space-y-5">
          <section className="bg-stone-900/80 border border-stone-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div>
              <span className="text-[11px] font-mono-ticket uppercase tracking-wider text-amber-400 block mb-1">
                Paso 1 · Catálogo Global IMDb
              </span>
              <h2 className="text-lg font-serif-cinema font-bold text-white">
                ¿Qué película viste y te gustó?
              </h2>
            </div>

            <form onSubmit={handleSearch} className="relative flex gap-2">
              <div className="relative flex-grow">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Escribí cualquier película del mundo..."
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-stone-950 border border-stone-700 focus:border-amber-400 text-xs text-stone-100 outline-none transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={isSearching || isCurating}
                className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-stone-950 font-bold text-xs cursor-pointer transition-colors shrink-0"
              >
                {isSearching ? 'Buscando...' : 'Buscar'}
              </button>
            </form>

            <div>
              <span className="text-[11px] text-stone-400 flex items-center gap-1.5 mb-2">
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                Enfoque del Programador:
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {CURATORIAL_LENSES.map((lens) => (
                  <button
                    key={lens.id}
                    type="button"
                    disabled={isCurating}
                    onClick={() => {
                      setSelectedLens(lens.id);
                      void handleSelectMovieForDoubleFeature(
                        currentMovieSource,
                        lens.id
                      );
                    }}
                    className={`px-2.5 py-2 rounded-xl text-[11px] font-medium text-left border transition-all cursor-pointer ${
                      selectedLens === lens.id
                        ? 'bg-amber-400/15 border-amber-400 text-amber-200'
                        : 'bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-700'
                    }`}
                  >
                    {lens.label}
                  </button>
                ))}
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-950/50 border border-red-800 text-red-200 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {searchResults.length > 0 && (
              <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1 border-t border-stone-800 pt-3">
                <span className="text-[11px] text-stone-400 block">
                  Resultados en IMDb (clic para curar función doble):
                </span>
                {searchResults.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    disabled={isCurating}
                    onClick={() => void handleSelectMovieForDoubleFeature(item)}
                    className="w-full text-left p-2 rounded-xl bg-stone-950 hover:bg-stone-800/90 border border-stone-800 hover:border-amber-500/50 flex items-center gap-3 transition-all cursor-pointer group"
                  >
                    {item.posterUrl ? (
                      <img
                        src={item.posterUrl}
                        alt={item.title}
                        className="w-8 h-12 object-cover rounded bg-stone-900 shrink-0"
                      />
                    ) : (
                      <div className="w-8 h-12 rounded bg-stone-900 flex items-center justify-center shrink-0">
                        <Film className="w-4 h-4 text-stone-600" />
                      </div>
                    )}
                    <div className="flex-grow min-w-0">
                      <p className="font-bold text-xs text-stone-100 truncate group-hover:text-amber-300">
                        {item.title} ({item.year})
                      </p>
                      <p className="text-[11px] text-stone-400 truncate">
                        Elenco: {item.castInfo}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone-500 group-hover:text-amber-400 shrink-0" />
                  </button>
                ))}
              </div>
            )}

            <div className="pt-3 border-t border-stone-800/80">
              <span className="text-[11px] text-stone-400 flex items-center gap-1.5 mb-2">
                <History className="w-3.5 h-3.5 text-amber-400" />
                Ciclos de Colección & Historial (0 gasto API):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {historyPrograms.map((prog) => (
                  <button
                    key={prog.id}
                    type="button"
                    onClick={() => {
                      setSelectedProgram(prog);
                      setCurrentMovieSource({
                        id: prog.id,
                        title: prog.filmA.title,
                        castInfo: prog.filmA.director,
                        year: prog.filmA.year,
                        posterUrl: prog.filmA.posterUrl,
                      });
                    }}
                    className={`text-[11px] px-2.5 py-1 rounded-lg border cursor-pointer transition-all ${
                      selectedProgram.id === prog.id
                        ? 'bg-amber-400/20 border-amber-400 text-amber-200 font-semibold'
                        : 'bg-stone-950 hover:bg-stone-800 border-stone-800 text-stone-300'
                    }`}
                  >
                    {prog.filmA.title} + {prog.filmB.title}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-stone-900/70 border border-stone-800/90 rounded-2xl p-5 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Papel & Tinta del Boleto
            </h2>

            <div className="grid grid-cols-2 gap-2">
              {TICKET_THEMES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTicketTheme(t)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                    ticketTheme.id === t.id
                      ? 'border-amber-400 bg-stone-950 ring-2 ring-amber-400/20'
                      : 'border-stone-800 bg-stone-950/60 hover:border-stone-700'
                  }`}
                >
                  <span
                    className="w-5 h-5 rounded-full border border-stone-600 shrink-0"
                    style={{ backgroundColor: t.paperBg }}
                  />
                  <span className="text-xs font-medium text-stone-200 leading-tight">
                    {t.name}
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section className="bg-stone-900/70 border border-stone-800/90 rounded-2xl p-5 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Personalizar Sala & Butaca
            </h2>

            <div>
              <label className="text-[11px] text-stone-400 block mb-1">
                Nombre del Cineclub / Sala
              </label>
              <input
                type="text"
                value={cinemaName}
                onChange={(e) => setCinemaName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 focus:border-amber-400 text-xs text-stone-100 outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-stone-400 block mb-1">Día</label>
                <input
                  type="text"
                  value={screeningDate}
                  onChange={(e) => setScreeningDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 focus:border-amber-400 text-xs text-stone-100 outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] text-stone-400 block mb-1">
                  Hora de inicio
                </label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 focus:border-amber-400 text-xs text-stone-100 outline-none font-mono-ticket [color-scheme:dark]"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] text-stone-400 block mb-1">Fila y Butaca</label>
              <input
                type="text"
                value={seatCode}
                onChange={(e) => setSeatCode(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 focus:border-amber-400 text-xs text-stone-100 outline-none font-mono-ticket"
              />
            </div>
          </section>
        </div>

        <div className="lg:col-span-7 space-y-6">
          {isCurating ? (
            <div className="bg-stone-900/60 border border-stone-800 rounded-2xl p-12 flex flex-col items-center justify-center text-center min-h-[420px]">
              <Loader2 className="w-8 h-8 text-amber-400 animate-spin mb-3" />
              <h3 className="text-xl font-serif-cinema font-bold text-white">
                El programador está armando tu Función Doble...
              </h3>
              <p className="text-xs text-stone-400 mt-1 max-w-md">
                Analizando la puesta en escena, el director y el tono de «{currentMovieSource.title}» para encontrar su pareja ideal en 35mm.
              </p>
            </div>
          ) : (
            <>
              <div className="bg-stone-900/70 border border-stone-800/90 rounded-2xl p-6 space-y-5 shadow-xl">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800 pb-4">
                  <div>
                    <span className="text-[11px] font-mono-ticket uppercase text-amber-400 block">
                      {selectedProgram.moodBadge}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-serif-cinema font-bold text-stone-100 mt-0.5">
                      {selectedProgram.cycleTitle}
                    </h2>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => void handleAnotherPairing()}
                      className="px-3 py-1.5 rounded-lg bg-stone-950 hover:bg-stone-800 border border-amber-500/40 text-amber-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Otra 2ª Función</span>
                    </button>

                    <span className="text-xs font-mono-ticket text-stone-400 flex items-center gap-1.5 bg-stone-950 px-3 py-1.5 rounded-lg border border-stone-800">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      {`${schedule.totalMin} min · fin ${schedule.end}${
                        schedule.endsNextDay ? ' (+1 día)' : ''
                      }`}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-stone-950/90 border border-stone-800 flex gap-3.5">
                    {selectedProgram.filmA.posterUrl && (
                      <img
                        src={selectedProgram.filmA.posterUrl}
                        alt={selectedProgram.filmA.title}
                        className="w-16 h-24 object-cover rounded-lg border border-stone-800 shrink-0"
                      />
                    )}
                    <div className="min-w-0 flex-grow">
                      <div className="flex items-center justify-between text-[10px] font-mono-ticket uppercase text-stone-400 mb-1">
                        <span>1ª Función</span>
                        <span>{schedule.firstStart} HS</span>
                      </div>
                      <h3 className="text-xl font-serif-cinema font-bold text-white leading-tight">
                        {selectedProgram.filmA.title}
                      </h3>
                      <p className="text-xs text-amber-300/90 font-medium mt-0.5">
                        Dir. {selectedProgram.filmA.director} ({selectedProgram.filmA.year})
                      </p>
                      <p className="text-xs text-stone-400 mt-2 leading-snug">
                        {selectedProgram.filmA.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-red-950/20 border-2 border-amber-500/40 relative">
                    <div className="flex items-center justify-between text-[10px] font-mono-ticket uppercase text-amber-400 mb-1">
                      <span>2ª Función Recomendada</span>
                      <span>{schedule.secondStart} HS</span>
                    </div>
                    <h3 className="text-xl font-serif-cinema font-bold text-amber-200 leading-tight">
                      {selectedProgram.filmB.title}
                    </h3>
                    <p className="text-xs text-amber-400 font-medium mt-0.5">
                      Dir. {selectedProgram.filmB.director} ({selectedProgram.filmB.year})
                    </p>
                    <p className="text-xs text-stone-300 mt-2 leading-snug">
                      {selectedProgram.filmB.tagline}
                    </p>
                  </div>
                </div>

                <div className="bg-stone-950/90 p-5 rounded-xl border border-amber-500/20 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono-ticket uppercase tracking-wider text-amber-400">
                    <Quote className="w-4 h-4" />
                    <span>Por qué funcionan juntas (Nota del Programador)</span>
                  </div>
                  <p className="text-stone-200 leading-relaxed font-serif-cinema text-[17px] italic">
                    {selectedProgram.curatorNote}
                  </p>
                </div>
              </div>

              <div className="bg-stone-950 border border-stone-800/90 rounded-2xl p-4 sm:p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono-ticket uppercase tracking-widest text-amber-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Boleto Oficial de la Función Doble (2400×1120px HD)
                  </span>
                  <span className="text-[11px] font-mono-ticket text-stone-500">
                    SERIE #{serialNumber}
                  </span>
                </div>

                <canvas
                  ref={canvasRef}
                  className="w-full h-auto rounded-lg shadow-xl border border-stone-900"
                />
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
