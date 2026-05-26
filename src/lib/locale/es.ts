export const es = {
  "success": {
    "user_created": "Usuario creada",
    "user_deleted": "Usuario eliminada",
    "user_updated": "Usuario actualizada",
    "user_signed_up": "Usuario registrada",
    "user_signed_in": "Usuario registrado",
    "user_registered": "Usuario registrada",
    "user_logged_in": "Usuario registrado"
  },
  "error": {
    "user_not_authenticated": "Usuario no autenticada",
    "user_not_authorized": "Usuario no autorizada",
    "user_not_found": "Usuario no encontrado",
    "invalid_team_abbr": "Equipo proporcionado no válido; formato esperado de 3 letras de la NBA (por ejemplo, CLE, MIA)",
    "invalid_season_format": "Formato no válido; utilice AAAA, AAAYPRE, AAAAPOST o AAAASTAR",
    "invalie_date_format": "Fecha proporcionada no válida; fecha prevista AAAA-MM-DD o formato AAAA-MMM-DD (por ejemplo, 2025-01-25, 2025-JAN-12)",
    "invalid_season_format_short": "Formato no válido; utilizar AAAA o AAAYYPRE",
    "invalid_data_response": "Respuesta de datos no válida",
    "invalid_email_format": "Formato de correo electrónico no válido (falló la verificación Unicode)",
    "not_found": "NO ENCONTRADO: {field} no encontrado",
    "failed_find": "No se pudo encontrar el documento solicitado",
    "no_id": "No se ha proporcionado ninguna identificación o ésta no es válida",
    "no_or_invalid_api_version": "Versión de API nula o no válida",
    "missing_or_invalid_api_version": "Versión de API faltante o no válida",
    "failed_link_route": "[mainRoute]: No se pudo vincular la ruta: {linker}",
    "league_full": "la liga esta llena",
    "membership_already_processed": "Membresía ya procesada",
    "failed_update": "No se pudo actualizar este documento",
    "user_has_team": "La usuario ya tiene un equipo",
    "team_already_selected": "Equipo ya seleccionado",
    "cpu_cannot_be_selected": "No se puede seleccionar el equipo de CPU",
    "team_has_already_selected": "{field} ya ha sido seleccionado",
    "max_count_per_myleague": "Máximo de {count} equipos por myleague",
    "user_select_team_required": "Todos los miembros deben seleccionar un equipo antes de redactar",
    "league_sched_before_invite": "Se debe fijar el calendario de la liga antes de invitar",
    "draft_already_started": "El borrador ya empezó",
    "generic": "Algo salió mal al cargar esta página.",
    "unable_load_page": "No se puede cargar esta página",
    "unable_create_account": "No se puede crear la cuenta",
    "unable_log_in": "No se puede iniciar sesión"
  },
  "validation": {
    "default": {
      "required": "{field} es obligatorio",
      "length": "La longitud de {field} ({value}) debe estar entre {min} y {max} caracteres",
      "max_length": "{field} longitud ({value}) excede el límite de caracteres",
      "invalid": "Inválida {field}",
      "unique": "{field} ya existe",
      "min_length": "La longitud de {field} ({value}) debe tener al menos {min} caracteres"
    },
    "password": "La contraseña debe tener más de 8 caracteres con al menos una mayúscula, una minúscula, un número y un símbolo.",
    "max_league_allowed_user": "Se alcanzó el límite máximo ({max}) permitido para las ligas de propiedad."
  },
  "message": {
    "owner_no_myleague": "No se ha creado ninguna MyLeague",
    "membership_expired": "Membresía caducada",
    "membership_processed": "Membresía ya procesada",
    "draft_started": "La fecha del draft ya comenzó",
    "find_bootcamp": "Encuentra el bootcamp adecuado",
    "footer": "Aprenda más rápido con bootcamps técnicos seleccionados y educación moderna para desarrolladores."
  },
  "nav": {
    "dashboard": "Panel",
    "draft_room": "Sala de borrador",
    "player_stats": "Estadísticas del jugador",
    "sidebar": {
      "league": "liga",
      "team": "equipo",
      "player": "Jugadora",
      "items": {
        "standings": "Clasificación",
        "playoffs": "Eliminatorias",
        "calendar": "Calendario",
        "transactions": "Actas",
        "power_rankings": "Clasificaciones de poder",
        "news_feed": "Noticias",
        "roster": "Lista",
        "schedule": "Cronograma",
        "stats": "Estadísticas"
      },
      "dashboard": "Panel",
      "league_lounge": "Salón de la liga"
    },
    "footer": {
      "all_system_operational": "● Todos los sistemas operativos"
    }
  },
  "back": "Atrás",
  "team_stats": "Estadísticas del equipo",
  "league_leaders": "Líderes de la liga",
  "calendar": "Calendario",
  "power_rankings": "Clasificaciones de poder",
  "standings": "Clasificación",
  "start_draft": "Iniciar borrador",
  "invite_user": "Invitar usuario",
  "log_in": "Acceso",
  "logging_in": "Iniciar sesión",
  "log_out": "Finalizar la sesión",
  "logging_out": "Cerrar sesión",
  "register": "Registro",
  "bootcamp": "Campamento de entrenamiento",
  "bootcamps": "Campamentos de entrenamiento",
  "bootcamp_para": {
    "1": "Compare programas, costos, resultados y enfoque de cursos del catálogo del Proyecto CodeCoach.",
    "footer": "Aprenda más rápido con bootcamps técnicos seleccionados y educación moderna para desarrolladores."
  },
  "remote_or_pending": "Remota o ubicación pendiente",
  "view": "Vista",
  "no_records_yet": "Aún no hay registros.",
  "website": "Sitio web",
  "manage": "Administrar",
  "create_account": "Crear una cuenta",
  "create_an_account": "Crear una cuenta",
  "roles": {
    "student": "Alumna",
    "trainer": "Entrenadora",
    "admin": "Administradora",
    "guest": "Invitada"
  },
  "go_back": "Volver",
  "log_in_instead": "Inicie sesión en su lugar",
  "search_bootcamps": "Buscar campamentos de entrenamiento",
  "sort": "Clasificar",
  "filters": {
    "bootcamp": {
      "rating": "Clasificación",
      "averageCost": "Costo de menor a mayor",
      "-averageCost": "Costo de alto a bajo",
      "name": "Nombre"
    }
  }
} as const
