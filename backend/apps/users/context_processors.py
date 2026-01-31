from apps.users.models import Administrator  # adapte le chemin si besoin


def company_processor(request):
    """
    Fournit l'entreprise liée à l'utilisateur connecté
    via le modèle Administrator
    """
    if not request.user.is_authenticated:
        return {}

    company = None
    administrator = None

    try:
        administrator = request.user.administrator  # OneToOne reverse
        company = administrator.company
    except Administrator.DoesNotExist:
        pass

    return {
        "current_company": company,
        "current_administrator": administrator,
    }
