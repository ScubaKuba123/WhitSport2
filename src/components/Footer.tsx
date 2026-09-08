export default function Footer() {
  return (
    <footer className="border-t mt-12 bg-zinc-50">
      <div className="max-w-[1280px] mx-auto px-4 py-8 grid md:grid-cols-4 gap-8 text-sm">
        <div>
          <div className="flex items-center gap-2 mb-2"><img src="/logo-whip-sport.svg" alt="logo" className="w-8 h-8 rounded-lg" /><span className="font-bold">WHIP-SPORT.PL</span></div>
          <div className="text-xs text-zinc-500">Sklep Taktyczny</div>
          <div>Sebastian Zawadzki</div>
          <div>ul. Niedziałkowskiego 79</div>
          <div>42-600 Tarnowskie Góry</div>
          <div className="mt-2">whip.sport.pl@gmail.com<br />513-061-320</div>
          <div className="text-xs mt-2 text-amber-800 bg-amber-50 border border-amber-200 rounded p-2">Sprzedaż wyłącznie online. Nie prowadzimy sklepu stacjonarnego.</div>
        </div>
        <div>
          <div className="font-semibold mb-2">Informacje</div>
          <ul className="space-y-1 text-zinc-600">
            <li><a href="#">Dostawa i płatność</a></li>
            <li><a href="#">Polityka prywatności</a></li>
            <li><a href="#">Regulamin</a></li>
            <li><a href="#">Promocje i rabaty</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Konto</div>
          <ul className="space-y-1 text-zinc-600">
            <li><a href="#">Zaloguj się</a></li>
            <li><a href="#">Zarejestruj się</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Na skróty</div>
          <ul className="space-y-1 text-zinc-600">
            <li><a href="#about">O mnie</a></li>
            <li><a href="#contact">Kontakt</a></li>
            <li><a href="https://www.instagram.com/whip_sport.pl/" target="_blank">Instagram</a></li>
            <li><a href="https://www.youtube.com/@WhipFightingSportWFS" target="_blank">YouTube</a></li>
          </ul>
        </div>
      </div>
      <div className="text-center text-xs text-zinc-500 py-4 border-t">© {new Date().getFullYear()} WHIP-SPORT.PL — Cordura IRR, Pasamon, ITW Nexus / Duraflex, Amann</div>
    </footer>
  );
}
