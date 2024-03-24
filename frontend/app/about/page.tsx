import { title } from "@/components/primitives";

export default function AboutPage() {
	return (
		<div>
			<h1 className={title()}>About</h1>
			<section>
				<p> <br />Spark is a web app designed with Next.js, TypeScript, FastAPI, MongoDB, 
					and NLP to match underpriviledged high schooler to mentors at their
					dream colleges. This project was created for HoosHack 2024.
				</p>
			</section>
			<section>
				<p> <br />
					<a className="text-blue-300" href="https://www.linkedin.com/in/abhishek-satpathy-1b2b84270/">Abhishek Satpathy </a>|
					<a className="text-blue-300" href="https://www.linkedin.com/in/rishan-biju/"> Rishan Biju </a>|
					<a className="text-blue-300" href="https://www.linkedin.com/in/joey-chenn/"> Joey Chen</a>
				</p>
			</section>
		</div>
	);
}