import { useEffect, useState } from "react";

type EmergencyContact = {
  id: number;
  name: string;
  relationship: string | null;
  phone: string;
  email: string | null;
  notification_channel: "email" | "sms" | "whatsapp";
  is_primary: boolean;
};

type EmergencyContactsResponse = {
  contacts: EmergencyContact[];
};

type EmergencyContactForm = {
  name: string;
  relationship: string;
  phone: string;
  email: string;
  notification_channel: "email" | "sms" | "whatsapp";
  is_primary: boolean;
};

const API_BASE_URL = (
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ??
  "http://localhost:8000"
).replace(/\/$/, "");

const AUTH_TOKEN_KEY = "safedrive_token";

const initialForm: EmergencyContactForm = {
  name: "",
  relationship: "",
  phone: "",
  email: "",
  notification_channel: "email",
  is_primary: false,
};

export default function EmergencyContactsPage(): React.JSX.Element {
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [form, setForm] = useState<EmergencyContactForm>(initialForm);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    void loadContacts();
  }, []);

  async function request<T>(
    path: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);

    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...(options.headers ?? {}),
      },
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const message =
        data?.errors?.name?.[0] ??
        data?.errors?.phone?.[0] ??
        data?.errors?.email?.[0] ??
        data?.message ??
        "No fue posible completar la acción.";

      throw new Error(message);
    }

    return data as T;
  }

  async function loadContacts(): Promise<void> {
    setIsLoading(true);
    setError(null);

    try {
      const data = await request<EmergencyContactsResponse>(
        "/api/emergency-contacts"
      );

      setContacts(data.contacts);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "No fue posible cargar los contactos."
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSaving(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const data = await request<{
        message: string;
        contact: EmergencyContact;
      }>("/api/emergency-contacts", {
        method: "POST",
        body: JSON.stringify(form),
      });

      setSuccessMessage(data.message);
      setForm(initialForm);

      await loadContacts();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "No fue posible guardar el contacto."
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function handleMakePrimary(contact: EmergencyContact): Promise<void> {
    setError(null);
    setSuccessMessage(null);

    try {
      const data = await request<{
        message: string;
        contact: EmergencyContact;
      }>(`/api/emergency-contacts/${contact.id}/primary`, {
        method: "PATCH",
      });

      setSuccessMessage(data.message);

      await loadContacts();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "No fue posible actualizar el contacto principal."
      );
    }
  }

  async function handleDelete(contact: EmergencyContact): Promise<void> {
    const confirmed = window.confirm(
      `¿Eliminar a ${contact.name} como contacto de emergencia?`
    );

    if (!confirmed) {
      return;
    }

    setError(null);
    setSuccessMessage(null);

    try {
      const data = await request<{ message: string }>(
        `/api/emergency-contacts/${contact.id}`,
        {
          method: "DELETE",
        }
      );

      setSuccessMessage(data.message);

      await loadContacts();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "No fue posible eliminar el contacto."
      );
    }
  }

  return (
    <div className="bg-[#FDFAF5] text-[#2C2A24] font-sans min-h-screen p-5 md:p-10">
      <main className="max-w-6xl mx-auto space-y-8">
        <header className="space-y-2">
          <h1 className="text-[32px] font-bold text-[#195f97]">
            Contactos de emergencia
          </h1>

          <p className="text-[#706A5A] text-[16px]">
            Agrega las personas que serán notificadas si SafeDrive detecta una
            alerta crítica durante una sesión de conducción.
          </p>
        </header>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm font-medium">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 text-sm font-medium">
            {successMessage}
          </div>
        )}

        <section className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-8">
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-[#F3EDD9] rounded-xl p-5 shadow-[0px_4px_20px_rgba(44,42,36,0.04)] space-y-4"
          >
            <div>
              <h2 className="text-[24px] font-semibold text-[#2C2A24]">
                Nuevo contacto
              </h2>
              <p className="text-sm text-[#706A5A]">
                Este contacto recibirá alertas si ocurre una emergencia.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#706A5A]">
                Nombre completo
              </label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-[#EDE6CE] bg-white outline-none focus:ring-2 focus:ring-[#4A86C0]/20 focus:border-[#4A86C0]"
                value={form.name}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    name: event.target.value,
                  }))
                }
                placeholder="Ej: María Gómez"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#706A5A]">
                Parentesco
              </label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-[#EDE6CE] bg-white outline-none focus:ring-2 focus:ring-[#4A86C0]/20 focus:border-[#4A86C0]"
                value={form.relationship}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    relationship: event.target.value,
                  }))
                }
                placeholder="Ej: Madre, hermano, pareja"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#706A5A]">
                Teléfono
              </label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-[#EDE6CE] bg-white outline-none focus:ring-2 focus:ring-[#4A86C0]/20 focus:border-[#4A86C0]"
                value={form.phone}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    phone: event.target.value,
                  }))
                }
                placeholder="Ej: +57 300 000 0000"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#706A5A]">
                Email
              </label>
              <input
                className="w-full px-4 py-3 rounded-lg border border-[#EDE6CE] bg-white outline-none focus:ring-2 focus:ring-[#4A86C0]/20 focus:border-[#4A86C0]"
                value={form.email}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    email: event.target.value,
                  }))
                }
                placeholder="contacto@email.com"
                type="email"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#706A5A]">
                Canal preferido
              </label>
              <select
                className="w-full px-4 py-3 rounded-lg border border-[#EDE6CE] bg-white outline-none focus:ring-2 focus:ring-[#4A86C0]/20 focus:border-[#4A86C0]"
                value={form.notification_channel}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    notification_channel: event.target
                      .value as EmergencyContactForm["notification_channel"],
                  }))
                }
              >
                <option value="email">Email</option>
                <option value="sms">SMS</option>
                <option value="whatsapp">WhatsApp</option>
              </select>
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_primary}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    is_primary: event.target.checked,
                  }))
                }
                className="w-4 h-4 rounded border-[#c1c7d1] text-[#195f97]"
              />
              <span className="text-sm font-medium text-[#706A5A]">
                Marcar como contacto principal
              </span>
            </label>

            <button
              type="submit"
              disabled={isSaving}
              className="w-full bg-[#4A86C0] hover:bg-[#3d71a3] text-white text-sm font-semibold py-4 rounded-lg shadow-sm active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {isSaving ? "Guardando..." : "Guardar contacto"}
            </button>
          </form>

          <section className="bg-white border border-[#F3EDD9] rounded-xl p-5 shadow-[0px_4px_20px_rgba(44,42,36,0.04)]">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-[24px] font-semibold text-[#2C2A24]">
                  Contactos registrados
                </h2>
                <p className="text-sm text-[#706A5A]">
                  El contacto principal será el primero en recibir alertas.
                </p>
              </div>

              <span className="bg-[#EAF4EE] text-[#5DAB7D] px-3 py-1 rounded-full text-xs font-bold">
                {contacts.length} contacto(s)
              </span>
            </div>

            {isLoading ? (
              <div className="p-4 bg-[#FDFAF5] border border-[#F3EDD9] rounded-lg text-[#706A5A]">
                Cargando contactos...
              </div>
            ) : contacts.length === 0 ? (
              <div className="p-4 bg-[#FDFAF5] border border-[#F3EDD9] rounded-lg text-[#706A5A]">
                Aún no tienes contactos de emergencia.
              </div>
            ) : (
              <ul className="space-y-3">
                {contacts.map((contact) => (
                  <li
                    key={contact.id}
                    className="p-4 bg-[#FDFAF5] border border-[#F3EDD9] rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#4A86C0]">
                          contact_emergency
                        </span>

                        <p className="font-semibold text-[#2C2A24]">
                          {contact.name}
                        </p>

                        {contact.is_primary && (
                          <span className="bg-[#EAF4EE] text-[#5DAB7D] px-2 py-0.5 rounded-full text-[11px] font-bold">
                            Principal
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-[#706A5A]">
                        {contact.relationship || "Sin parentesco"} •{" "}
                        {contact.phone}
                      </p>

                      <p className="text-sm text-[#706A5A]">
                        {contact.email || "Sin email"} • Canal:{" "}
                        {contact.notification_channel}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {!contact.is_primary && (
                        <button
                          type="button"
                          onClick={() => void handleMakePrimary(contact)}
                          className="px-3 py-2 rounded-lg bg-[#EAF4EE] text-[#5DAB7D] text-xs font-bold hover:bg-[#dcefe4] transition-all"
                        >
                          Hacer principal
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => void handleDelete(contact)}
                        className="px-3 py-2 rounded-lg bg-red-50 text-red-700 text-xs font-bold hover:bg-red-100 transition-all"
                      >
                        Eliminar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </section>
      </main>
    </div>
  );
}