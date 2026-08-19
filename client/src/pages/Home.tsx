import { Link } from "react-router-dom";
import {
  FolderKanban,
  CheckSquare,
  Lightbulb,
  GitBranch,
  ArrowRight,
} from "lucide-react";

function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-lg">
  <div className="mx-auto flex max-w-7xl items-center justify-between px-10 py-5">

    {/* Logo */}
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
        F
      </div>

      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Forge-OS
        </h1>

        <p className="text-xs text-slate-500">
          Project Workflow Platform
        </p>
      </div>
    </div>

    {/* Center Links */}
    <div className="hidden items-center gap-10 font-medium text-slate-600 lg:flex">
      <a
        href="#features"
        className="transition hover:text-blue-600"
      >
        Features
      </a>

      <a
        href="#analytics"
        className="transition hover:text-blue-600"
      >
        Analytics
      </a>

      <a
        href="#lifecycle"
        className="transition hover:text-blue-600"
      >
        Lifecycle
      </a>

      <a
        href="#contact"
        className="transition hover:text-blue-600"
      >
        Contact
      </a>
    </div>

    {/* Actions */}
    <div className="flex items-center gap-4">
      <Link
        to="/login"
        className="rounded-xl border border-slate-300 px-6 py-2.5 font-medium transition hover:bg-slate-100"
      >
        Login
      </Link>

      <Link
        to="/register"
        className="rounded-xl bg-blue-600 px-6 py-2.5 font-medium text-white shadow-lg transition hover:bg-blue-700"
      >
        Get Started
      </Link>
    </div>

  </div>
</nav>
{/* Hero */}
<section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-100">

<div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-blue-200 opacity-30 blur-3xl" />

<div className="absolute right-0 top-40 h-96 w-96 rounded-full bg-purple-200 opacity-30 blur-3xl" />

<div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-cyan-200 opacity-30 blur-3xl" />

 <div className="mx-auto flex min-h-screen max-w-7xl items-center px-10">   
    <div className="relative z-10 grid w-full items-center gap-24 lg:grid-cols-[1.2fr_1fr]">
      {/* Left Side */}
      <div>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-gray-900">
          Manage Projects
          <span className="block text-blue-600">
            Like a Professional Team
          </span>
        </h1>
      <p className="mt-8 max-w-2xl text-2xl leading-relaxed text-gray-600"> 
          Forge-OS helps teams manage projects,
          track tasks, organize ideas and monitor
          the complete software development lifecycle.
        </p>

        <div className="mt-10 flex gap-5">
          <Link
            to="/register"
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-10 py-5 text-lg font-semibold text-white shadow-lg hover:bg-blue-700"
          >
            Get Started
            <ArrowRight size={18} />
          </Link>

          <Link
            to="/login"
           className="rounded-xl border bg-white px-10 py-5 text-lg font-semibold hover:bg-gray-50"
          >
            Login
          </Link>
        </div>
      </div>
      

      {/* Right Side Dashboard Preview */}
      <div className="min-h-[600px] rounded-3xl bg-white p-10 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-bold">
            Forge-OS Dashboard
          </h3>

          <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
            Live
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl bg-blue-50 p-8">
            <p className="text-sm text-gray-500">
              Projects
            </p>

            <h4 className="text-5xl font-bold text-blue-700">
              12
            </h4>
          </div>

          <div className="rounded-xl bg-green-50 p-8">
            <p className="text-sm text-gray-500">
              Tasks
            </p>

            <h4 className="text-5xl font-bold text-green-700">
              84
            </h4>
          </div>

          <div className="rounded-xl bg-purple-50 p-8">
            <p className="text-sm text-gray-500">
              Members
            </p>

            <h4 className="text-5xl font-bold text-purple-700">
              15
            </h4>
          </div>

          <div className="rounded-xl bg-orange-50 p-8">
            <p className="text-sm text-gray-500">
              Completion
            </p>

            <h4 className="text-5xl font-bold text-orange-700">
              78%
            </h4>
          </div>
        </div>

        <div className="mt-6 rounded-xl border p-8">
          <h4 className="mb-3 font-semibold">
            Recent Activity
          </h4>
          <div className="mt-6 rounded-xl border p-5">
  <h4 className="mb-4 font-semibold">
    Active Projects
  </h4>

  <div className="space-y-3">
    <div className="flex justify-between">
      <span>Payroll System</span>
      <span className="font-semibold text-green-600">
        80%
      </span>
    </div>

    <div className="flex justify-between">
      <span>AutoFlow AI</span>
      <span className="font-semibold text-blue-600">
        65%
      </span>
    </div>

    <div className="flex justify-between">
      <span>APS System</span>
      <span className="font-semibold text-orange-600">
        45%
      </span>
    </div>
  </div>
</div>
          <div className="space-y-2 text-sm text-gray-600">
            <p>✓ Payroll System created</p>
            <p>✓ Task completed</p>
            <p>✓ Lifecycle moved to Testing</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>
      <section className="bg-white py-24">
  <div className="mx-auto max-w-7xl px-10">
    <div className="text-center">
      <h2 className="text-5xl font-bold text-gray-900">
        Why Forge-OS?
      </h2>

      <p className="mt-4 text-xl text-gray-600">
        Everything your development team needs
        in one workspace.
      </p>
    </div>

    <div className="mt-16 grid gap-8 md:grid-cols-3">
      <div className="rounded-3xl bg-blue-50 p-8">
        <h3 className="text-2xl font-bold">
          Manage Projects
        </h3>

        <p className="mt-4 text-gray-600">
          Organize projects, assign members,
          and track progress from start to finish.
        </p>
      </div>

      <div className="rounded-3xl bg-green-50 p-8">
        <h3 className="text-2xl font-bold">
          Team Collaboration
        </h3>

        <p className="mt-4 text-gray-600">
          Work together through shared tasks,
          lifecycle tracking, and project updates.
        </p>
      </div>

      <div className="rounded-3xl bg-purple-50 p-8">
        <h3 className="text-2xl font-bold">
          Analytics & Insights
        </h3>

        <p className="mt-4 text-gray-600">
          Monitor productivity, completion rates,
          and project health in real time.
        </p>
      </div>
    </div>
  </div>
</section>

      {/* Features */}
      <section
  id="features"
  className="mx-auto max-w-7xl px-10 py-32"
>
        <h2 className="mb-12 text-center text-4xl font-bold">
          Core Features
        </h2>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl bg-white p-8 shadow-lg transition hover:-translate-y-2 hover:shadow-2xl">
            <FolderKanban
              size={40}
              className="mb-4 text-blue-600"
            />

            <h3 className="mb-3 text-xl font-bold">
              Project Management
            </h3>

            <p className="text-gray-600">
              Create and manage projects with team
              collaboration and ownership.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-lg transition hover:-translate-y-2 hover:shadow-2xl">
            <Lightbulb
              size={40}
              className="mb-4 text-yellow-500"
            />

            <h3 className="mb-3 text-xl font-bold">
              Ideas Hub
            </h3>

            <p className="text-gray-600">
              Store links, documents, images and
              innovative project ideas.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-lg transition hover:-translate-y-2 hover:shadow-2xl">
            <CheckSquare
              size={40}
              className="mb-4 text-green-600"
            />

            <h3 className="mb-3 text-xl font-bold">
              Kanban Tasks
            </h3>

            <p className="text-gray-600">
              Track progress using backlog,
              planning, review and done stages.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-lg transition hover:-translate-y-2 hover:shadow-2xl">
            <GitBranch
              size={40}
              className="mb-4 text-purple-600"
            />

            <h3 className="mb-3 text-xl font-bold">
              Lifecycle Tracking
            </h3>

            <p className="text-gray-600">
              Monitor SDLC phases from Planning to
              Maintenance.
            </p>
          </div>
        </div>
      </section>

  <section
  id="lifecycle"
  className="min-h-screen bg-white"
>
  <div className="mx-auto flex h-screen max-w-7xl flex-col justify-center px-10">

    <div className="mb-16 text-center">
      <h2 className="text-5xl font-bold">
        Software Development Lifecycle
      </h2>

      <p className="mt-4 text-xl text-gray-600">
        Track every stage of your project from
        idea to deployment.
      </p>
    </div>

    <div className="grid gap-6 md:grid-cols-4">

      <div className="rounded-3xl bg-blue-50 p-8 shadow-lg">
        <h3 className="font-bold text-blue-700">
          Planning
        </h3>
        <p className="mt-3 text-gray-600">
          Gather requirements and define scope.
        </p>
      </div>

      <div className="rounded-3xl bg-green-50 p-8 shadow-lg">
        <h3 className="font-bold text-green-700">
          Analysis
        </h3>
        <p className="mt-3 text-gray-600">
          Analyze requirements and risks.
        </p>
      </div>

      <div className="rounded-3xl bg-purple-50 p-8 shadow-lg">
        <h3 className="font-bold text-purple-700">
          Design
        </h3>
        <p className="mt-3 text-gray-600">
          Create architecture and UI designs.
        </p>
      </div>

      <div className="rounded-3xl bg-orange-50 p-8 shadow-lg">
        <h3 className="font-bold text-orange-700">
          Development
        </h3>
        <p className="mt-3 text-gray-600">
          Build frontend and backend systems.
        </p>
      </div>

      <div className="rounded-3xl bg-red-50 p-8 shadow-lg">
        <h3 className="font-bold text-red-700">
          Testing
        </h3>
        <p className="mt-3 text-gray-600">
          Validate quality and performance.
        </p>
      </div>

      <div className="rounded-3xl bg-cyan-50 p-8 shadow-lg">
        <h3 className="font-bold text-cyan-700">
          Deployment
        </h3>
        <p className="mt-3 text-gray-600">
          Release to production environment.
        </p>
      </div>

      <div className="rounded-3xl bg-slate-100 p-8 shadow-lg md:col-span-2">
        <h3 className="font-bold text-slate-700">
          Maintenance
        </h3>

        <p className="mt-3 text-gray-600">
          Continuous improvements, monitoring,
          updates and bug fixes.
        </p>
      </div>

    </div>

  </div>
</section>
 
     {/* Analytics Dashboard */}
<section
  id="analytics"
  className="min-h-screen bg-slate-50"
>
  <div className="mx-auto flex h-screen max-w-7xl flex-col justify-center px-10">

    <div className="mb-16 text-center">
      <h2 className="text-5xl font-bold">
        Team Analytics
      </h2>

      <p className="mt-4 text-xl text-gray-600">
        Monitor performance, productivity and project progress.
      </p>
    </div>

    <div className="grid gap-6 lg:grid-cols-4">

      <div className="rounded-3xl bg-white p-8 shadow-lg">
        <p className="text-gray-500">Projects</p>
        <h3 className="mt-3 text-5xl font-bold text-blue-600">
          24
        </h3>
      </div>

      <div className="rounded-3xl bg-white p-8 shadow-lg">
        <p className="text-gray-500">Tasks</p>
        <h3 className="mt-3 text-5xl font-bold text-green-600">
          158
        </h3>
      </div>

      <div className="rounded-3xl bg-white p-8 shadow-lg">
        <p className="text-gray-500">Members</p>
        <h3 className="mt-3 text-5xl font-bold text-purple-600">
          12
        </h3>
      </div>

      <div className="rounded-3xl bg-white p-8 shadow-lg">
        <p className="text-gray-500">Success Rate</p>
        <h3 className="mt-3 text-5xl font-bold text-orange-600">
          87%
        </h3>
      </div>

    </div>

    <div className="mt-10 grid gap-6 lg:grid-cols-2">

      <div className="rounded-3xl bg-white p-8 shadow-lg">
        <h3 className="mb-6 text-xl font-bold">
          Productivity Trend
        </h3>

        <div className="space-y-4">
          <div className="h-4 rounded-full bg-slate-200">
            <div className="h-4 w-[80%] rounded-full bg-blue-600" />
          </div>

          <div className="h-4 rounded-full bg-slate-200">
            <div className="h-4 w-[65%] rounded-full bg-green-600" />
          </div>

          <div className="h-4 rounded-full bg-slate-200">
            <div className="h-4 w-[90%] rounded-full bg-purple-600" />
          </div>
        </div>
      </div>

      <div className="rounded-3xl bg-white p-8 shadow-lg">
        <h3 className="mb-6 text-xl font-bold">
          Team Activity
        </h3>

        <div className="space-y-4 text-gray-600">
          <p>✓ Prachi created AutoFlow AI</p>
          <p>✓ Atharv completed 5 tasks</p>
          <p>✓ SDLC moved to Testing</p>
          <p>✓ New member joined project</p>
        </div>
      </div>

    </div>

  </div>
</section>
      {/* CTA */}
      <section className="bg-blue-600 py-20 text-center text-white">
        <h2 className="text-4xl font-bold">
          Ready to Build Better Projects?
        </h2>

        <p className="mt-4 text-lg text-blue-100">
          Join Forge-OS and streamline your
          workflow today.
        </p>

        <Link
          to="/register"
          className="mt-8 inline-block rounded-xl bg-white px-8 py-4 font-semibold text-blue-600"
        >
          Start Now
        </Link>
      </section>
      <footer  id="contact" className="bg-slate-900 py-12 text-white">
  <div className="mx-auto max-w-7xl px-10 text-center">
    <h3 className="text-2xl font-bold">
      Forge-OS
    </h3>

    <p className="mt-3 text-slate-400">
      Modern Project Workflow Management Platform
    </p>

    <div className="mt-6 flex justify-center gap-6 text-slate-400">
      <span>Projects</span>
      <span>Tasks</span>
      <span>Analytics</span>
      <span>Lifecycle</span>
    </div>

    <p className="mt-8 text-sm text-slate-500">
      © 2026 Forge-OS. Built with React, Node.js,
      TypeScript and MongoDB.
    </p>
  </div>
</footer>
    </div>
  );
}

export default Home;